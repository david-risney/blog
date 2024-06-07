---
title: "Changing the User Agent string in UWP WebView"
date: 2018-10-23
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    There's no perfect way to change the user agent string for the UWP WebView (x-ms-webview in HTML, Windows.UI.Xaml.Controls.WebView in XAML, and Windows.Web.UI.Interop.WebViewControl in Win32) but
    there are two imperfect methods folks end up using.
  </p><p>
    The first is to call UrlMkSetSessionOption. This is an old public API that allows you to configure various arcane options including one that is the default user agent string for requests running
    through urlmon. This API is allowed by the Microsoft Store for UWP apps. The change it applies is process wide which has two potential drawbacks. If you want to be able to have different UA
    strings set for different requests from a WebView that's not really possible with this solution. The other drawback is if you're using out of process WebView, you need to ensure you're calling
    into UrlMkSetSessionOption in the WebView's process. You'll need to write third party WinRT that calls UrlMkSetSessionOption, create the out of proc WebView, navigate it to some trusted local
    page, use AddWebAllowedObject or provide that URI WinRT access, and call into your third party WinRT. You'll need to do that for any new WebView process you create.
  </p><p>
    The second less generally applicable solution is to use NavigateWithHttpRequestMessage and set the User-Agent HTTP header. In this case you get to control the scope of the user agent string
    changes but has the limitations that not all sub resource downloads will use this user agent string and for navigations you don't initiate you have to manually intercept and re-request being
    careful to transfer over all POST body state and HTTP headers correctly. That last part is not actually possible for iframes.
  </p></div></div>
