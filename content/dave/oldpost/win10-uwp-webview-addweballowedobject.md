---
title: "Win10 UWP WebView AddWebAllowedObject details"
date: 2017-09-04
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    The x-ms-webview HTML element has the void <a href="https://msdn.microsoft.com/en-us/library/windows/apps/dn926632.aspx">addWebAllowedObject</a>(string name, any value) method and the webview
    XAML element has the void <a href="https://docs.microsoft.com/en-us/uwp/api/windows.ui.xaml.controls.webview#Windows_UI_Xaml_Controls_WebView_AddWebAllowedObject_System_String_System_Object_">AddWebAllowedObject</a>(String name,
    Object value) method. The object parameter is projected into the webview’s top-level HTML document’s script engine as a new property on the global object with property name set to the name
    parameter. It is not injected into the current document but rather it is projected during initialization of the next top-level HTML document to which the webview navigates.
  </p><h2>
    Lifetime
  </h2><p>
    If AddWebAllowedObject is called during a NavigationStarting event handler the object will be injected into the document resulting from the navigation corresponding to that event.
  </p><p>
    If AddWebAllowedObject is called outside of the NavigationStarting event handler it will apply to the navigation corresponding to the next explicit navigate method called on the webview or the
    navigation corresponding to the next NavigationStarting event handler that fires, whichever comes first.
  </p><p>
    To avoid this potential race, you should use AddWebAllowedObject in one of two ways: 1. During a NavigationStarting event handler, 2. Before calling a Navigate method and without returning to the
    main loop.
  </p><p>
    If called both before calling a navigate method and in the NavigationStarting event handler then the result is the aggregate of all those calls.
  </p><p>
    If called multiple times for the same document with the same name the last call wins and the previous are silently ignored.
  </p><p>
    If AddWebAllowedObject is called for a navigation and that navigation fails or redirects to a different URI, the AddWebAllowedObject call is silently ignored.
  </p><p>
    After successfully adding an object to a document, the object will no longer be projected once a navigation to a new document occurs.
  </p><h2>
    WinRT access
  </h2><p>
    If AddWebAllowedObject is called for a document with All WinRT access then projection will succeed and the object will be added.
  </p><p>
    If AddWebAllowedObject is called for a document which has a URI which has no declared WinRT access via ApplicationContentUriRules then Allow for web only WinRT access is given to that document.
  </p><p>
    If the document has Allow for web only WinRT access then projection will succeed only if the object’s runtimeclass has the Windows.Foundation.Metadata.AllowForWeb metadata attribute.
  </p><h2>
    Object requirements
  </h2><p>
    The object must implement the IAgileObject interface. Because the XAML and HTML webview elements run on ASTA view threads and the webview’s content’s JavaScript thread runs on another ASTA thread
    a developer should not create their non-agile runtimeclass on the view thread. To encourage end developers to do this correctly we require the object implements IAgileObject.
  </p><h2>
    Property name
  </h2><p>
    The name parameter must be a valid JavaScript property name, otherwise the call will fail silently. If the name is already a property name on the global object, that property is overwritten if
    the property is configurable. Non-configurable properties on the global object are not overwritten and the AddWebAllowedObject call fails silently. On success, the projected property is writable,
    configurable, and enumerable.
  </p><h2>
    Errors
  </h2><p>
    Some errors as described above fail silently. Other issues, such as lack of IAgileObject or lack of the AllowForWeb attribute result in an error in the JavaScript developer console.
  </p></div></div>
