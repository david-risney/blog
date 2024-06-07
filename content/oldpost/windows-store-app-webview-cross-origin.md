---
title: "Windows Store App WebView Cross Origin XMLHttpRequest Behavior"
date: 2016-06-02
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    TL;DR: Web content in a JavaScript Windows Store app or WebView in a Windows Store app that has full access to WinRT also gets to use XHR unrestricted by cross origin checks.
  </p><p>
    By default web content in a WebView control in a Windows Store App has the same sort of limitations as that web content in a web browser. However, if you give the URI of that web content full
    access to WinRT, then the web content also gains the ability to use XMLHttpRequest unrestricted by cross origin checks. This means no CORS checks and no OPTIONS requests. This only works if the
    web content's URI matches a Rule in the ApplicationContentUriRules of your app's manifest and that Rule declares WindowsRuntimeAccess="all". If it declares WinRT access as 'None' or
    'AllowForWebOnly' then XHR acts as it normally does.
  </p><p>
    In terms of security, if you've already given a page access to all of WinRT which includes the HttpRequest class and other networking classes that don't perform cross origin checks, then allowing
    XHR to skip CORS doesn't make things worse.
  </p></div></div>
