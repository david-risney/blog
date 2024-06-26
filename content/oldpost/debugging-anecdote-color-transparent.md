---
title: "Debugging anecdote - the color transparent black breaks accessibility "
date: 2014-05-22
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    Some time back while I was working on getting the <a href="http://msdn.microsoft.com/en-us/library/windows/apps/dn631759.aspx">Javascript Windows Store app platform</a> running on Windows Phone
    (now available on the last Windows Phone release!) I had an interesting bug that in retrospect is amusing.
  </p><p>
    I had just finished a work item to get accessibility working for JS WinPhone apps when I got a new bug: With some set of JS apps, accessibility appeared to be totally broken. At that time in
    development the only mechanism we had to test accessibility was a test tool that runs on the PC, connects to the phone, and dumps out the accessibility tree of whatever app is running on the
    phone. In this bug, the tool would spin for a while and then timeout with an error and no accessibility information.
  </p><p>
    My first thought was this was an issue in my new accessibility code. However, debugging with breakpoints on my code I could see none of my code was run nor the code that should call it. The code
    that called that code was a more generic messaging system that hit my breakpoints constantly.
  </p><p>
    Rather than trying to work backward from the failure point, I decided to try and narrow down the repro and work forwards from there. One thing all the apps with the bug had in common was their
    usage of <a href="http://try.buildwinjs.com/">WinJS</a>, but not all WinJS apps demonstrated the issue. Using a binary search approach on one such app I removed unrelated app code until all that
    was left was the app's usage of the WinJS AppBar and the bug still occurred. I replaced the WinJS AppBar usage with direct usage of the underlying AppBar WinRT APIs and continued.
  </p><p>
    Only some calls to the AppBar WinRT object produced the issue:
  </p><pre><code>        var appBar = Windows.UI.WebUI.Core.WebUICommandBar.getForCurrentView(); <br />        // appBar.opacity = 1;<br />        // appBar.closeDisplayMode = Windows.UI.WebUI.Core.WebUICommandBarClosedDisplayMode.default;<br />        appBar.backgroundColor = Windows.UI.Colors.white; // Bug! </code></pre>Just
  setting the background color appeared to cause the issue and I didn't even have to display the AppBar. Through additional trial and error I was blown away to discover that some colors I would set
  caused the issue and other colors did not. Black wouldn't cause the issue but transparent black would. So would aqua but not white.
  <p>
    I eventually realized that predefined WinRT color values like Windows.UI.Colors.aqua would cause the issue while JS literal based colors didn't cause the issue (<a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.color.aspx">Windows.UI.Color</a> is a WinRT struct which projects in JS as a JS literal object with the struct members as JS
    object properties so its easy to write something like <code>{r: 0, g: 0, b: 0, a: 0}</code> to make a color) and I had been mixing both in my tests without realizing there would be a difference.
    I debugged into the backgroundColor property setter that consumed the WinRT color struct to see what was different between Windows.UI.Colors.black and <code>{a: 1, r: 0, g: 0, b: 0}</code> and
    found the two structs to be byte wise exactly the same.
  </p><p>
    On a hunch I tried my test app with only a reference to the color and otherwise no interaction with the AppBar and not doing anything with the actual reference to the color:
    <code>Windows.UI.Colors.black;</code>. This too caused the issue. I knew that the implementation for these WinRT const values live in a DLL and guessed that something in the code to create these
    predefined colors was causing the issue. I debugged in and no luck. Now I also have experienced crusty code that would <a href="http://blogs.msdn.com/b/oldnewthing/archive/2004/01/27/63401.aspx">do exciting things in its DllMain</a>, the function that's called when a DLL is loaded into the process so I tried modifying my
    C++ code to simply LoadLibrary the DLL containing the WinRT color definition, windows.ui.xaml.dll and found the bug still occurred! A short lived moment of relief as the world seemed to make
    sense again.
  </p><p>
    Debugging into DllMain nothing interesting happened. There were interesting calls in there to be sure, but all of them behind conditions that were false. I was again stumped. On another hunch I
    tried renaming the DLL and only LoadLibrary'ing it and the bug went away. I took a different DLL renamed it windows.ui.xaml.dll and tried LoadLibrary'ing that and the bug came back. Just the name
    of the DLL was causing the issue.
  </p><p>
    I searched for the DLL name in our source code index and found hits in the accessibility tool. Grinning I opened the source to find that the accessibility tool's phone side service was trying to
    determine if a process belonged to a XAML app or not because XAML apps had a different accessibility contract. It did this by checking to see if windows.ui.xaml.dll was loaded in the target
    process.
  </p><p>
    At this point I got to fix my main issue and open several new bugs for the variety of problems I had just run into. This is a how to on writing software that is difficult to debug.
  </p></div></div>
