---
title: "Win10 PWA Terminology"
date: 2018-05-31
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    Folks familiar with JavaScript UWP apps in Win10 have often been confused by what PWAs in Win10 actually are. TLDR: PWAs in Win10 are simply JavaScript UWP apps. The main difference between these
    JS UWP Apps and our non-PWA JS UWP apps are our target end developer audience, and how we get Win10 PWAs into the Microsoft Store. See this <a href="https://blogs.windows.com/msedgedev/2018/02/06/welcoming-progressive-web-apps-edge-windows-10/">Win10 blog post on PWAs on Win10</a> for related info.
  </p><div class="separator" style="clear: both; text-align: center;"><a href="https://2.bp.blogspot.com/-n9rUPrvz1R0/WxBrwedBw2I/AAAAAAAABy8/t8fVGO92wCMl3Fl8JBT5qmNjWd9TyWgqACLcBGAs/s1600/pwa-diagram.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" data-original-height="271" data-original-width="705" src="https://2.bp.blogspot.com/-n9rUPrvz1R0/WxBrwedBw2I/AAAAAAAABy8/t8fVGO92wCMl3Fl8JBT5qmNjWd9TyWgqACLcBGAs/s1600/pwa-diagram.png" /></a></div><h2>
    Web App
  </h2><p>
    On the web a subset of web sites are web apps. These are web sites that have app like behavior - that is a user might call it an app like Outlook, Maps or Gmail. And they may also have a <a href="https://www.w3.org/TR/appmanifest/">W3C app manifest</a>.
  </p><p>
    A subset of web apps are progressive web apps. Progressive web apps are web apps that have a W3C app manifest and a <a href="https://www.w3.org/TR/service-workers-1/">service worker</a>. Various
    OSes are beginning to support PWAs as first class apps on their platform. This is true for Win10 as well in which PWAs are run as a WWA.
  </p><h2>
    Windows Web App
  </h2><p>
    In Win10 a WWA (Windows Web App) is an unofficial term for a JavaScript UWP app. These are UWP apps so they have an AppxManifest.xml, they are packaged in an Appx package, they run in an App
    Container, they use WinRT APIs, and are installed via the Microsoft Store. Specific to WWAs though, is that the AppxManifest.xml specifies a StartPage attribute identifying some HTML content to
    be used as the app. When the app is activated the OS will create a WWAHost.exe process that hosts the HTML content using the EdgeHtml rendering engine.
  </p><h2>
    Packaged vs Hosted Web App
  </h2><p>
    Within that we have a notion of a packaged web app and an HWA (hosted web app). There's no real technical distinction for the end developer between these two. The only real difference is whether
    the StartPage identifies remote HTML content on the web (HWA), or packaged HTML content from the app's appx package (packaged web app). An end developer may create an app that is a mix of these
    as well, with HTML content in the package and HTML content from the web. These terms are more like ends on a continuum and identifying two different developer scenarios since the underlying
    technical aspect is pretty much identical.
  </p><h2>
    Win10 PWA
  </h2><p>
    Win10 PWAs are simply HWAs that specify a StartPage of a URI for a PWA on the web. These are still JavaScript UWP apps with all the same behavior and abilities as other UWP apps. We have two ways
    of getting PWAs into the Microsoft Store as Win10 PWAs. The first is <a href="https://www.pwabuilder.com/">PWA Builder</a> which is a tool that helps PWA end developers create and submit to the
    Microsoft Store a Win10 PWA appx package. The second is a crawler that runs over the web looking for PWAs which we convert and submit to the Store using an automated PWA Builder-like tool to
    create a Win10 PWA from PWAs on the web (see <a href="https://blogs.windows.com/msedgedev/2018/02/06/welcoming-progressive-web-apps-edge-windows-10/">Welcoming PWAs to Win10</a> for more info).
    In both cases the conversion involves examining the PWAs W3C app manifest and producing a corresponding AppxManifest.xml. Not all features supported by AppxManifest.xml are also available in the
    W3c app manifest. But the result of PWA Builder can be a working starting point for end developers who can then update the AppxManifest.xml as they like to support features like share targets or
    others not available in W3C app manifests.
  </p></div></div>
