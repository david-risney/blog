---
title: "Tiny browser features: JSBrowser crash resistance"
date: 2018-05-13
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p><a href="https://github.com/david-risney/JSBrowser">JSBrowser</a> is a basic browser built as a Win10 JavaScript UWP app around the WebView HTML element. Its fun and relatively simple to
    implement tiny browser features in JavaScript and in this post I'm implementing crash resistance.
  </p><p>
    The normal DOM mechanisms for <a href="https://docs.microsoft.com/en-us/microsoft-edge/webview#remarks">creating an HTML WebView</a> create an in-process WebView, in which the WebView runs on a
    unique UI thread. But we can use the MSWebView constructor instead to create an out-of-process WebView in which the WebView runs in its own distinct WebView process. Unlike an in-process WebView,
    Web content running in an out-of-process WebView can only crash the WebView process and not the app process.
  </p><pre><code>        this.replaceWebView = () =&gt; {<br />            let webview = document.querySelector("#WebView");<br />            // Cannot access webview.src - anything that would need to communicate with the webview process may fail<br />            let oldSrc = browser.currentUrl;<br />            const webviewParent = webview.parentElement;<br />            webviewParent.removeChild(webview);<br />            webview = new MSWebView();<br />            Object.assign(this, {<br />                "webview": webview<br />            });<br />            webview.setAttribute("id", "WebView");<br /><br />            // During startup our currentUrl field is blank. If the WebView has crashed <br />            // and we were on a URI then we may obtain it from this property.<br />            if (browser.currentUrl &amp;&amp; browser.currentUrl != "") {<br />                this.trigger("newWebview");<br />                this.navigateTo(browser.currentUrl);<br />            }<br />            webviewParent.appendChild(webview);</code></pre><p>
    I run replaceWebView during startup to replace the in-process WebView created via HTML markup with an out-of-process WebView. I could be doing more to dynamically copy styles, attributes, etc but
    I know what I need to set on the WebView and just do that.
  </p><p>
    When a WebView process crashes the corresponding WebView object is no longer useful and a new WebView element must be created. In fact if the old WebView object is used it may throw and will no
    longer have valid state. Accordingly when the WebView crashes I run replaceWebView again. Additionally, I need to store the last URI we've navigated to (browser.currentUrl in the above) since the
    crashed WebView object won't know what URI it is on after it crashes.
  </p><pre><code>            webview.addEventListener("MSWebViewProcessExited", () =&gt; { <br />                if (browser.currentUrl === browser.lastCrashUrl) {                   ++browser.lastCrashUrlCrashCount; <br />                } <br />                else { <br />                    browser.lastCrashUrl = browser.currentUrl; <br />                    browser.lastCrashUrlCrashCount = 1; <br />                } <br />                // If we crash again and again on the same URI, maybe stop trying to load that URI. <br />                if (browser.lastCrashUrlCrashCount &gt;= 3) { <br />                    browser.lastCrashUrl = ""; <br />                    browser.lastCrashUrlCrashCount = 0; <br />                    browser.currentUrl = browser.startPage; <br />                } <br />                this.replaceWebView(); <br />            }); </code></pre><p>
    I also keep track of the last URI that we recovered and how many times we've recovered that same URI. If the same URI crashes more than 3 times in a row then I assume that it will keep happening
    and I navigate to the start URI instead.
  </p></div></div>
