---
title: "GoBack/GoForward in Win10 UWP WebView"
date: 2018-10-23
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    The GoBack and GoForward methods on the UWP WebView (x-ms-webview in HTML, Windows.UI.Xaml.Controls.WebView in XAML, and Windows.Web.UI.Interop.WebViewControl in Win32) act the same as the Back
    and Forward buttons in the Edge browser. They don't necessarily change the top level document of the WebView. If inside the webview an iframe navigates then that navigation will be recorded in
    the forward/back history and the GoBack / GoForward call may result in navigating that iframe. This makes sense as an end user using the Edge browser since if I click a link to navigate one place
    and then hit Back I expect to sort of undo that most recent navigation regardless of if that navigation happened in an iframe or the top level document.
  </p><p>
    If that doesn't make sense for your application and you want to navigate forward or back ignoring iframe navigates, unfortunately there's no perfect workaround.
  </p><p>
    One workaround could be to try calling GoBack and then checking if a FrameNavigationStarting event fires or a NavigationStarting event fires. If a frame navigates then try calling GoBack again.
    There could be async races in this case since other navigates could come in and send you the wrong signal and interrupt your multi step GoBack operation.
  </p><p>
    You could also try keeping track of all top level document navigations and manually navigate back to the URIs you care about. However, GoBack and GoForward also restore some amount of user state
    (form fills etc) in addition to navigating. Manually calling navigate will not give this same behavior.
  </p></div></div>
