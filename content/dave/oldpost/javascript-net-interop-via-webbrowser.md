---
title: "JavaScript & .NET interop via WebBrowser Control"
date: 2011-04-05
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    For my <a href="http://deletethis.net/dave/dev/geolocmock/">GeolocMock</a> weekend project I intended to use the Bing Maps API to display a map in a WebBrowser control and allow the user to
    interact with that to select a location to be consumed by my application. Getting my .NET code to talk to the JavaScript in the WebBrowser control was surprisingly easy.
  </p><p>
    To have .NET execute JavaScript code you can use the InvokeScript method passing the name of the JavaScript function to execute and an object array of parameters to pass:
  </p><pre><code>this.webBrowser2.Document.InvokeScript("onLocationStateChanged",<br />   new object[] {<br />      latitudeTextBoxText,<br />      longitudeTextBoxText,<br />      altitudeTextBoxText,<br />      uncertaintyTextBoxText<br />   });</code></pre><p>
    The other direction, having JavaScript call into .NET is slightly more complicated but still pretty easy as far as language interop goes. The first step is to mark your assembly as ComVisible so
    that it can interact with JavaScript via COM. VS had already added a ComVisible declaration to my project I just had to change the value to true.
  </p><pre><code>[assembly: ComVisible(true)]</code></pre><p>
    Next set ObjectForScripting attribute to the object you want to expose to JavaScript.
  </p><pre><code>this.webBrowser2.ObjectForScripting = this.locationState;</code></pre><p>
    Now that object is exposed as window.external in JavaScript and you can call methods on it.
  </p><pre><code>window.external.Set(lat, long, alt, gUncert);</code></pre><p>
    However you don't seem to be able to test for the existence of methods off of it. For example the following JavaScript generates an exception for me even though I have a Set method:
  </p><pre><code>if (window.external &amp;&amp; window.external.Set) {</code></pre><div class="blogger-post-footer"><img width="1" height="1" src="https://blogger.googleusercontent.com/tracker/1670048653123050463-1115399204951118616?l=davescoolblog.blogspot.com" alt="" /></div></div></div>
