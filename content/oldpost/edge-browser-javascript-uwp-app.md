---
title: "Edge browser and JavaScript UWP app security model comparison"
date: 2018-11-29
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    There are two main differences in terms of security between a JavaScript UWP app and the Edge browser:
  </p><h2>
    Process Model
  </h2><p>
    A JavaScript UWP app has one process (technically not true with background tasks and other edge cases but ignoring that for the moment) that runs in the corresponding appcontainer defined by the
    app's appx manifest. This one process is where edgehtml is loaded and is rendering HTML, talking to the network, and executing script. Specifically, the UWP main UI thread is the one where your
    script is running and calling into WinRT.
  </p><p>
    In the Edge browser there is a browser process running in the same appcontainer defined by its appx manifest, but there are also tab processes. These tab processes are running in restricted app
    containers that have fewer appx capabilities. The browser process has XAML loaded and coordinates between tabs and handles some (non-WinRT) brokering from the tab processes. The tab processes
    load edgehtml and that is where they render HTML, talk to the network and execute script.
  </p><p>
    There is no way to configure the JavaScript UWP app's process model but using WebViews you can approximate it. You can create out of process WebViews and to some extent configure their
    capabilities, although not to the same extent as the browser. The WebView processes in this case are similar to the browser's tab processes. See the <a href="https://docs.microsoft.com/en-us/microsoft-edge/hosting/webview/mswebviewprocess#createwebviewasync">MSWebViewProcess object</a> for configuring out of process WebView creation. I also
    implemented <a href="https://deletethis.net/dave/2018-05/Tiny+browser+features%3A+JSBrowser+crash+resistance">out of proc WebView tabs</a> in my JSBrowser fork.
  </p><h2>
    ApplicationContentUriRules
  </h2><p>
    The ApplicationContentUriRules (ACUR) section of the appx manifest lets an application define what URIs are considered app code. See a previous post for <a href="https://deletethis.net/dave/2017-06/Application+Content+URI+Rule+effects">the list of ACUR effects</a>.
  </p><p>
    Notably app code is able to access WinRT APIs. Because of this, DOM security restrictions are loosended to match what is possible with WinRT.
  </p><p>
    Privileged DOM APIs like geolocation, camera, mic etc require a user prompt in the browser before use. App code does not show the same browser prompt. There still may be an OS prompt – the same
    prompt that applies to any UWP app, but that’s usually per app not per origin.
  </p><p>
    App code also gets to use XMLHttpRequest or fetch to access cross origin content. Because UWP apps have separate state, cross origin here might not mean much to an attacker unless your app also
    has the user login to Facebook or some other interesting cross origin target.
  </p></div></div>
