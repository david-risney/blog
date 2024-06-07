---
title: "Client Side Cross Domain Data YQL Hack"
date: 2012-02-27
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    One of the more limiting issues of writing client side script in the browser is the same origin limitations of XMLHttpRequest. The latest version of all browsers support a subset of CORS to allow
    servers to opt-in particular resources for cross-domain access. Since IE8 there's <a href="http://msdn.microsoft.com/en-us/library/cc288060%28v=VS.85%29.aspx">XDomainRequest</a> and in all other
    browsers (including <a href="http://blogs.msdn.com/b/ie/archive/2012/02/09/cors-for-xhr-in-ie10.aspx">IE10</a>) there's <a href="http://www.w3.org/TR/XMLHttpRequest2/#the-withcredentials-attribute">XHR L2's cross-origin request features</a>. But the vast majority of resources out on the web do not opt-in using CORS
    headers and so client side only web apps like a podcast player or a feed reader aren't doable.
  </p><p>
    One hack-y way around this I've found is to use <a href="http://developer.yahoo.com/yql/console/">YQL</a> as a CORS proxy. YQL applies the CORS header to all its responses and among its features
    it allows a caller to request an arbitrary XML, HTML, or JSON resource. So my network helper script first attempts to access a URI directly using XDomainRequest if that exists and XMLHttpRequest
    otherwise. If that fails it then tries to use XDR or XHR to access the URI via YQL. I wrap my URIs in the following manner, where type is either "html", "xml", or "json":
  </p><pre><code>        yqlRequest = function(uri, method, type, onComplete, onError) {<br />            var yqlUri = "http://query.yahooapis.com/v1/public/yql?q=" + <br />                encodeURIComponent("SELECT * FROM " + type + ' where url="' + encodeURIComponent(uri) + '"');<br /><br />            if (type == "html") {<br />                yqlUri += encodeURIComponent(" and xpath='/*'");<br />            }<br />            else if (type == "json") {<br />                yqlUri += "&amp;callback=&amp;format=json";<br />            }<br />            ...<br /><br /></code></pre>This
  also means I can get JSON data itself without having to go through JSONP.
</div></div>
