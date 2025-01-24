---
title: "URI Percent-Encoding Ignorance Level 1 - Purpose"
date: 2012-02-15
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p><i>As a professional URI aficionado I deal with various levels of ignorance on URI percent-encoding (aka URI encoding, or URL escaping).</i></p><p>
    Worse than the lame blog comments hating on percent-encoding is the shipping code which can do actual damage. In one very large project I won't name, I've fixed code that decodes all
    percent-encoded octets in a URI in order to get rid of pesky percents before calling ShellExecute. An unnamed developer with similar intent but clearly much craftier did the same thing in a loop
    until the string's length stopped changing. As it turns out percent-encoding serves a purpose and can't just be removed arbitrarily.
  </p><p>
    Percent-encoding exists so that one can represent data in a URI that would otherwise not be allowed or would be interpretted as a delimiter instead of data. For example, the space character
    (U+0020) is not allowed in a URI and so must be percent-encoded in order to appear in a URI:
  </p><ol><li><code>http://example.com/the%20path/</code></li><li><code>http://example.com/the path/</code></li></ol>In the above the first is a valid URI while the second is not valid since a space appears directly in the URI. Depending on the context and the code through which the wannabe URI is run one
  may get unexpected failure.
  <p>
    For an additional example, the question mark delimits the path from the query. If one wanted the question mark to appear as part of the path rather than delimit the path from the query, it must
    be percent-encoded:
  </p><ol><li><code>http://example.com/foo%3Fbar</code></li><li><code>http://example.com/foo?bar</code></li></ol>In the second, the question mark appears plainly and so delimits the path "<code>/foo</code>" from the query "<code>bar</code>". And in the first, the querstion mark is percent-encoded and so
  the path is "<code>/foo%3Fbar</code>".
  <div class="blogger-post-footer"><img width="1" height="1" src="https://blogger.googleusercontent.com/tracker/1670048653123050463-546284491891509604?l=davescoolblog.blogspot.com" alt="" /></div></div></div>
