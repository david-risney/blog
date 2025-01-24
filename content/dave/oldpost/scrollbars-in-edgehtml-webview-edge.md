---
title: "Scrollbars in EdgeHtml WebView and Edge browser"
date: 2019-08-22
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    The scrollbars in UWP WebView and in Edge have different default behavior leading to many emails to my team. (Everything I talk about here is for the EdgeHtml based WebView and Edge browser and
    does not apply to the Chromium based Edge browser and WebView2).
  </p><p>
    There is a Edge only <code><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/-ms-overflow-style">-ms-overflow-style</a></code> CSS property that controls scroll behavior. We have a
    different default for this in the WebView as compared to the Edge browser. If you want the appearance of the scrollbar in the WebView to match the browser then you must explicitly set that CSS
    property. The Edge browser default is <code>scrollbar</code> which gives us a Windows desktop styled non-auto-hiding scrollbar. The WebView default is <code>-ms-autohiding-scrollbar</code> which
    gives a sort of compromise between desktop and UWP app scrollbar behavior. In this configuration it is auto-hiding. When used with the mouse you'll get Windows desktop styled scrollbars and when
    used with touch you'll get the UWP styled scrollbars.
  </p><p>
    Since WebViews are intended to be used in apps this style is the default in order to better match the app's scrollbars. However this difference between the browser and WebView has led to
    confusion.
  </p><p>
    Here’s an <a href="https://jsfiddle.net/5vfrhtyb/">-ms-overflow-style JSFiddle</a> showing the difference between the two styles. Try it in the Edge browser and in WebView. An easy way to try it
    in the Edge WebView is using the <a href="https://www.microsoft.com/en-us/p/javascript-browser/9nblggh1z7vx?rtc=1&amp;activetab=pivot%3Aoverviewtab">JavaScript Browser</a>.
  </p></div></div>
