---
title: "JavaScript Microsoft Store app StartPage"
date: 2017-06-22
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    JavaScript Microsoft Store apps have some details related to activation that are specific to JavaScript Store apps and that are poorly documented which I’ll describe here.
  </p><h2>
    StartPage syntax
  </h2><p>
    The StartPage attributes in the AppxManifest.xml (<a href="https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/appxmanifestschema/element-application">Package/Applications/Application/@StartPage</a>, <a href="https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/appxmanifestschema/element-1-extension">Package/Applications/Extensions/Extension/@StartPage</a>) define the HTML page entry point for
    that kind of activation. That is, Application/@StartPage defines the entry point for tile activation, Extension[@Category="windows.protocol"]/@StartPage defines the entry point for URI handling
    activation, etc. There are two kinds of supported values in StartPage attributes: relative Windows file paths and absolute URIs. If the attribute doesn’t parse as an absolute URI then it is
    instead interpreted as relative Windows file path.
  </p><p>
    This implies a few things that I’ll declare explicitly here. Windows file paths, unlike URIs, don’t have a query or fragment, so if you are using a relative Windows file path for your StartPage
    attribute you cannot include anything like ‘?param=value’ at the end. Absolute URIs use percent-encoding for reserved characters like ‘%’ and ‘#’. If you have a ‘#’ in your HTML filename then you
    need to percent-encode that ‘#’ for a URI and not for a relative Windows file path.
  </p><p>
    If you specify a relative Windows file path, it is turned into an ms-appx URI by changing all backslashes to forward slashes, percent-encoding reserved characters, and combining the result with a
    base URI of ms-appx:///. Accordingly the relative Windows file paths are relative to the root of your package. If you are using a relative Windows file path as your StartPage and need to switch
    to using a URI so you can include a query or fragment, you can follow the same steps above.
  </p><h2>
    StartPage validity
  </h2><p>
    The validity of the StartPage is not determined before activation. If the StartPage is a relative Windows file path for a file that doesn’t exist, or an absolute URI that is not in the
    Application Content URI Rules, or something that doesn’t parse as a Windows file path or URI, or otherwise an absolute URI that fails to resolve (404, bad hostname, etc etc) then the JavaScript
    app will navigate to the app’s navigation error page (perhaps more on that in a future blog post). Just to call it out explicitly because I have personally accidentally done this: StartPage URIs
    are not automatically included in the Application Content URI Rules and if you forget to include your StartPage in your ACUR you will always fail to navigate to that StartPage.
  </p><h2>
    StartPage navigation
  </h2><p>
    When your app is activated for a particular activation kind, the StartPage value from the entry in your app’s manifest that corresponds to that activation kind is used as the navigation target.
    If the app is not already running, the app is activated, navigated to that StartPage value and then the <code>Windows.UI.WebUI.WebUIApplication activated</code> event is fired (more details on
    the order of various events in a moment). If, however, your app is already running and an activation occurs, we navigate or don’t navigate to the corresponding StartPage depending on the current
    page of the app. Take the app’s current top level document’s URI and if after removing the fragment it already matches the StartPage value then we won’t navigate and will jump straight to firing
    the WebUIApplication activated event.
  </p><p>
    Since navigating the top-level document means destroying the current JavaScript engine instance and losing all your state, this behavior might be a problem for you. If so, you can use the
    <code>MSApp.pageHandlesAllApplicationActivations(true)</code> API to always skip navigating to the StartPage and instead always jump straight to firing the WebUIApplication activated event. This
    does require of course that all of your pages all handle all activation kinds about which any part of your app cares.
  </p></div></div>
