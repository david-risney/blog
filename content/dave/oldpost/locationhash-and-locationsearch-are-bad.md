---
title: "location.hash and location.search are bad and they should feel bad"
date: 2014-05-22
---
<div xmlns="http://www.w3.org/1999/xhtml"><div>
  The <a href="http://www.w3.org/html/wg/drafts/html/master/browsers.html#the-location-interface">DOM location interface</a> exposes the HTML document's URI parsed into its properties. However, it is
  ancient and has problems that bug me but otherwise rarely show up in the real world. Complaining about mostly theoretical issues is why blogging exists, so here goes:
  <ul><li>The location object's search, hash, and protocol properties are all misnomers that lead to confusion about the correct terms:
      <ul><li>The 'search' property returns the URI's query property. The query property isn't limited to containing search terms.
        </li><li>The 'hash' property returns the URI's fragment property. This one is just named after its delimiter. It should be called the fragment.
        </li><li>The 'protocol' property returns the URI's scheme property. A URI's scheme isn't necessarily a protocol. The http URI scheme of course uses the HTTP protocol, but the https URI scheme is
        the HTTP protocol over SSL/TLS - there is no HTTPS protocol. Similarly for something like mailto - there is no mailto wire protocol.
        </li></ul></li><li>The 'hash' and 'search' location properties both return null in the case that their corresponding URI <a href="http://url.spec.whatwg.org/#dom-url-hash">property doesn't exist or if its the
    empty string</a>. A URI with no query property and a URI with an empty string query property that are otherwise the same, are not equal URIs and are allowed by HTTP to return different content.
    Similarly for the fragment. Unless the specific URI scheme defines otherwise, <a href="http://tools.ietf.org/html/rfc3986#section-6.2.3">an empty query or hash isn't the same as no query or
    hash</a>.
    </li></ul>But like complaining about <a href="http://en.wikipedia.org/wiki/Metric_time">the number of minutes in an hour</a> none of this can ever change without huge compat issues on the web.
  Accordingly I can only give my thanks to Anne van Kesteren and the awesome work on the <a href="http://url.spec.whatwg.org/">URL standard</a> moving towards a more sane (but still working
  practically within the constraints of compat) location object and URI parsing in the browser.
</div></div>
