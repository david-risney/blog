---
title: "URI Empty Path Segments Matter"
date: 2011-11-23
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    Shortly after joining the Internet Explorer team I got a bug from a PM on a popular Microsoft web server product that I'll leave unnamed (from now on UWS). The bug said that IE was handling empty
    path segments incorrectly by not removing them before resolving dotted path segments. For example UWS would do the following:
  </p><pre><code>A.1. http://example.com/a/b//../<br />A.2. http://example.com/a/b/../<br />A.3. http://example.com/a/</code></pre>In step 1 they are given a URI with dotted path segment and an empty
  path segment. In step 2 they remove the empty path segment, and in step 3 they resolve the dotted path segment. Whereas, given the same initial URI, IE would do the following:
  <pre><code>B.1. http://example.com/a/b//../<br />B.2. http://example.com/a/b/</code></pre>IE simply resolves the dotted path segment against the empty path segment and removes them both. So, how
  did I resolve this bug? As "By Design" of course!
  <p>
    The URI RFC allows path segments of zero length and does not assign them any special meaning. So generic user agents that intend to work on the web must not treat an empty path segment any
    different from a path segment with some text in it. In the case above IE is doing the correct thing.
  </p><p>
    That's the case for generic user agents, however servers may decide that a URI with an empty path segment returns the same resource as a the same URI without that empty path segment. Essentially
    they can decide to ignore empty path segments. Both IIS and Apache work this way and thus return the same resource for the following URIs:
  </p><pre><code>http://exmaple.com/foo//bar///baz<br />http://example.com/foo/bar/baz</code></pre>The issue for UWS is that it removes empty path segments before resolving dotted path segments. It must
  follow normal URI procedure before applying its own additional rules for empty path segments. Not doing that means they end up violating URI equivalency rules: URIs (A.1) and (B.2) are equivalent
  but UWS will not return the same resource for them.
  <div class="blogger-post-footer"><img width="1" height="1" src="https://blogger.googleusercontent.com/tracker/1670048653123050463-7528293767818521387?l=davescoolblog.blogspot.com" alt="" /></div></div></div>
