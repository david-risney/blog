---
title: WebView2 wv2winrt bug case study
description: A case study of a bug in WebView2 wv2winrt and how it was resolved.
date: 2026-03-05
tags:
  - webview2
  - wv2winrt
  - winrt
  - csharp
  - bug
  - software-development
---

The following are my notes on investigating a bug that a customer ran into back when I was on the WebView2 team. I'm sharing it here in case aspects of it can be helpful for folks in similar situations. The names of files, functions, and such have been changed. The customer had provided me a VS solution that would reproduce the bug somewhat minimally:

I've started the app, opened DevTools for WebView2, turned on `pause on exceptions`, then I reproduced the issue by clicking the appropriate button. JavaScript throws an exception and DevTools breaks in where we can see its a stack in our AddHostObjectToScript JavaScript code handling an incoming EmbeddedBrowserWebViewEvent message. To elaborate, part of WebView2.AddHostObjectToScript is implemented using JavaScript that runs in the context of the target HTML document. That JavaScript is responsible for producing JavaScript proxy objects that represent its corresponding native host object, proxying method calls and their results, property gets and sets, and so on. Looking at the exception information in the data JSON property on the message object in the DevTools we can see it is telling us there was an error `Member not found. (0x80020003)`.

This is a response message from the native side to a request message that the JavaScript side would have initiated. The common issue for this error means that the JavaScript side asked to run a method that doesn't exist. Though in this case the customer says something else is going on.

Next I look at the JavaScript to see what the corresponding request was. Its something in here so I rerun the repro but with a breakpoint on the start of this function to see when we hit the error (though I know it has to be the `await` call because the response we saw coming in was async and everything else in here is sync):
```
        async function exampleItemsAsync() {
            try {
                const instance = new Demo.Example();
                var result = await instance.getExampleItemsAsync();
                for (var v of result) {
                    logMessage('Enumerated Result Async: ' + v.identifier);
                }
            } catch (err) {
                logMessage('Async Error: ' + err);
            }
        }
```

I can see it is the await call.

At this point I might normally check that the `GetExampleItemsAsync` method exists in the C# class, in the winmd, in the wv2winrt tool output saying it found it, and in the generated wv2winrt C++ source. I would check the wv2winrt tool generated code under Project\WinRTAdapter\Generated Files\wv2winrt\Demo.g.cpp to see that there is code generated for the function, I would open Project\x64\Debug\WinRTAdapter\WinRTAdapter.winmd in [ILSpy](https://ilspy.net/) and see that it contains the method. But the customer says that's all there and I know this customer is good and has done their work. So I try putting a breakpoint in `Demo.Example.GetExampleItemsAsync()` and when I run the repro I can see that code is getting called. 

So it seems like there's something wrong happening between calling `GetExampleItemsAsync` and the JavaScript projection of the result. We saw the JavaScript projection receiving the message from native and it was already an error at that point and I stepped through and saw the end of the `GetExampleItemsAsync()` method succeeded, so its somewhere in between. Our options for code in between is the AddHostObjectToScript C++ WebView2 code, the AddHostObjectToScript C# code (which shouldn't be involved in this case if this is truly just WinRT) and the wv2winrt generated C++ code.

The wv2winrt generated code is under here: Project\WinRTAdapter\Generated Files\wv2winrt\Demo.g.cpp and where I'm guessing the issue lies. I open that file, search for `GetExampleItemsAsync`, and put some breakpoints in at invocation (its marked with a comment saying its for `// Invoke for ...`) and in the async completed handler (the callback lambda passed as a parameter to the `asyncResultAsWinRT.Completed` method call). Note I had to turn on mixed mode debugging in the VS project settings.

Then running the repro I see the invocation breakpoint hit, the C# code breakpoint I set earlier hits, then the async completed handler, then an exception is getting thrown from the c++/winrt code during our generated code call to Convert:

```
resultAsVariant.reset(Converter<decltype(resultAsWinRT), VARIANT>(
    dispatchAdapter).Convert(resultAsWinRT));
```

This generated code is the boundary between the WinRT code and the COM IDispatch code that AddHostObjectToScript deals with. This line is trying to convert the WinRT type we got as a result of the async call, into a COM IDispatch related type that AddHostObjectToScript can deal with.

Looking at the method in our stack just before the winrt::check_hresult call we can see the failure is coming from the following:

```
HRESULT hr = CreateDispatchFromInspectable(
    unwrappedAsABI.get(), dispatchAdapter, dispatch.put(), &is_cacheable);
```

I put a breakpoint on this line but disable it because it will get hit a bunch during the repro. I rerun the repro, and when the async completed handler bp hits, I reenable this bp. Stepping into this function the first interesting thing to check is the `IInspectable.RuntimeClassName` which is the name of the WinRT type we're trying to convert to. In this case its "Windows.Foundation.Collections.IVector\`1<Demo.ExampleItem>" which is a WinRT type for a vector of ExampleItems. Stepping through the code the call to `LookupInstanceConstructibleEntry` returns nullptr.

LookupInstanceConstructibleEntry should return a wrapper class we can use to wrap an `IInspectable` (WinRT type) of the specified type name. This list and the wrapper classes are all generated in the wv2winrt generated code. If the   `IVector\`1` typename isn't generated then there may be either something wrong with wv2winrt that it doesn't generate this, or we have to adjust the wv2winrt configuration to tell it to include this type.

Just to make sure I understand what code was generated I search for `IVector` in the wv2winrt code. In `globals.cpp` we can see the `s_instanceConstructibleEntries` array that `LookupInstanceConstructibleEntry` was checking. It is sorted alphabetically and in it we see some entries for `IVector` but not the type we want. So it looks like wv2winrt tool didn't include this type. We can look at the wv2winrt tool output from when WinRTAdapter is built to see if there's any clues. With verbose output turned on wv2winrt tool will list why it is including or excluding types. After rebuilding WinRTAdapter I search for `IVector` in the tool's output:

```
1>Including via reference: Demo.Example.GetListOfOther -> Windows.Foundation.Collections.IVector`1<Demo.MyClass>
1>Including via reference: Demo.Example.GetExampleItemsAsync -> Windows.Foundation.IAsyncOperation`1<Windows.Foundation.Collections.IIterable`1<Demo.ExampleItem>>
```

Conveniently, `GetListOfOther` gives us an example of something that is working and producing a found `IVector` type. The main differences are that `GetListOfOther` is not async and it is also listed here as returning an `IVector` whereas `GetExampleItemsAsync` is async and returning an `IIterable`.

Lower in the tool output we see it finding the async's completed type:

```
1>Including via reference: Windows.Foundation.IAsyncOperation`1<Windows.Foundation.Collections.IIterable`1<Demo.ExampleItem>>.GetResults -> Windows.Foundation.Collections.IIterable`1<Demo.ExampleItem>
```

So it doesn't seem like the issue is that its async. Opening Project\x64\Debug\Demo.winmd in [ILSpy](https://ilspy.net/) I can see that the winmd does indeed seem to say 
`IAsyncOperation<IIterable<ExampleItem>> IExampleClass.GetExampleItemsAsync();`

It seems to be the issue since at runtime the typename for the returned object was `IVector<ExampleItem>` not `IIterable<ExampleItem>`.

To resolve this we should either get C#/WinMD tool to return `IVector` instead of `IIterable`, or get the wv2winrt tool to generate code for `IVector<ExampleItem>`. I'm going to try the second option. 

I open the project file (Project\WinRTAdapter\WinRTAdapter.vcxproj) in VSCode and examine the WebView2* properties directly:
```
<WebView2DispatchAdapterIncludeFilters>Demo;Windows.System.UserProfile;Windows.Globalization.Language;$(WebView2DispatchAdapterIncludeFilters)</WebView2DispatchAdapterIncludeFilters>
<WV2WinRTVerbosity>high</WV2WinRTVerbosity>
```

(Notice that WV2WinRTVerbosity is already set to 'high' - this is important in order to get the wv2winrt tool verbose output that helped us earlier)

The WebView2DispatchAdapterIncludeFilters property is a bunch of namespace or type names that should be included by the wv2winrt code generation. We can try adding our type name here. When I do this I start getting strange errors. I expect this is a problem with the `\`` and `<>` characters and wv2winrt tool not handling it properly or the command line not getting constructed with them correctly. This is likely a wv2winrt bug although perhaps I'm messing up their encoding in the project file.

Instead I try the first solution, I add the following code to Example2.cs:

```
public IAsyncOperation<IList<ExampleItem>> DummyMethod() { return null; }
```

Now rebuilding Demo and WinRTAdapter everything is building. Looking in the wv2winrt output from WinRTAdapter we can see the following:

```
1>Including via reference: Demo.Example.DummyMethod -> Windows.Foundation.IAsyncOperation`1<Windows.Foundation.Collections.IVector`1<Demo.ExampleItem>>
```

And now running the bug repro the issue no longer occurs.

Having this dummy method is a workaround to the issue. A better solution would be to add the `IVector\`1` type to the project's WebView2DispatchAdapterIncludeFilters.

The real issue is that the runtime object and the winmd disagree about the type that's getting returned `IIterable` vs `IVector` which should be caused by CsWinRT the tool that is connecting up the C# to WinRT. 