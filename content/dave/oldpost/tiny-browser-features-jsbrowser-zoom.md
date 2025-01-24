---
title: "Tiny browser features: JSBrowser zoom"
date: 2018-05-10
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p><a href="https://github.com/david-risney/JSBrowser">JSBrowser</a> is a basic browser built as a Win10 JavaScript UWP app around the WebView HTML element. Its fun and relatively simple to
    implement tiny browser features in JavaScript and in this post I'm implementing zoom.
  </p><p>
    My plan to implement zoom is to add a zoom slider to the settings div that controls the scale of the WebView element via CSS transform. My <a href="https://github.com/david-risney/JSBrowser/commit/58987dcbc44b0818602e99574a3dec9406f4fa2e">resulting zoom change</a> is in git and you can try the whole thing out in my JSBrowser fork.
  </p><h2>
    Slider
  </h2><p>
    I can implement the zoom settings slider as a range type input HTML element. This conveniently provides me a min, max, and step property and suits exactly my purposes. I chose some values that I
    thought would be reasonable so the browser can scale between half to 3x by increments of one quarter. This is a tiny browser feature after all so there's no custom zoom entry.
  </p><pre><code>&lt;a&gt;&lt;label for="webviewZoom"&gt;Zoom&lt;/label&gt;&lt;input type="range" min="50" max="300" step="25" value="100" id="webviewZoom" /&gt;&lt;/a&gt;</code></pre><p>
    To let the user know this slider is for controlling zoom, I make a label HTML element that says Zoom. The label HTML element has a for attribute which takes the id of another HTML element. This
    lets the browser know what the label is labelling and lets the browser do things like when the label is clicked to put focus on the slider.
  </p><h2>
    Scale
  </h2><p>
    There are no explicit scale APIs for WebView so to change the size of the content in the WebView we use CSS.
  </p><pre><code>        this.applyWebviewZoom = state =&gt; {<br />            const minValue = this.webviewZoom.getAttribute("min");<br />            const maxValue = this.webviewZoom.getAttribute("max");<br />            const scaleValue = Math.max(Math.min(parseInt(this.webviewZoom.value, 10), maxValue), minValue) / 100;<br /><br />            // Use setAttribute so they all change together to avoid weird visual glitches<br />            this.webview.setAttribute("style", [<br />                ["width", (100 / scaleValue) + "%"],<br />                ["height", "calc(" + (-40 / scaleValue) + "px + " + (100 / scaleValue) + "%)"],<br />                ["transform", "scale(" + scaleValue + ")"]<br />            ].map(pair =&gt; pair[0] + ": " + pair[1]).join("; "));<br />        };</code></pre><p>
    Because the user changes the scale at runtime I accordingly replace the static CSS for the WebView element with the script above to programmatically modify the style of the WebView. I change the
    style with one setAttribute call to do my best to avoid the browser performing unnecessary work or displaying the WebView in an intermediate and incomplete state. Applying the scale to the
    element is as simple as adding 'transform: scale(X)' but then there are two interesting problems.
  </p><p>
    The first is that the size of the WebView is also scaled not just the content within it. To keep the WebView the same effective size so that it still fits properly into our browser UI, we must
    compensate for the scale in the WebView width and height. Accordingly, you can see that we scale up by scaleValue and then in width and height we divide by the scaleValue.
  </p><pre><code>transform-origin: 0% 0%;</code></pre><p>
    The other issue is that by default the scale transform's origin is the center of the WebView element. This means when scaled up all sides of the WebView would expand out. But when modifying the
    width and height those apply relative to the upper left of the element so our inverse scale application to the width and height above aren't quite enough. We also have to change the origin of the
    scale transform to match the origin of the changes to the width and height.
  </p></div></div>
