---
title: "URI Percent Encoding Ignorance Level 2 - There is no Unencoded URI"
date: 2012-02-20
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p><i>As a professional URI aficionado I deal with various levels of ignorance on URI percent-encoding (aka URI encoding, or URL escaping).</i></p><p>
    Getting into the more subtle levels of URI percent-encoding ignorance, folks try to apply their knowledge of percent-encoding to URIs as a whole producing the concepts escaped URIs and unescaped
    URIs. However there are no such things - URIs themselves aren't percent-encoded or decoded but rather contain characters that are percent-encoded or decoded. Applying percent-encoding or decoding
    to a URI as a whole produces a new and non-equivalent URI.
  </p><p>
    Instead of lingering on the incorrect concepts we'll just cover the correct ones: there's raw unencoded data, non-normal form URIs and normal form URIs. For example:
  </p><ol type="A"><li>http://example.com/%74%68%65%3F%70%61%74%68?query
    </li><li>http://example.com/the%3Fpath?query
    </li><li>"http", "example.com", "the?path", "query"
    </li></ol><p>
    In the above (A) is not an 'encoded URI' but rather a non-normal form URI. The characters of 'the' and 'path' are percent-encoded but as unreserved characters specific in the RFC should not be
    encoded. In the normal form of the URI (B) the characters are decoded. But (B) is not a 'decoded URI' -- it still has an encoded '?' in it because that's a reserved character which by the RFC
    holds different meaning when appearing decoded versus encoded. Specifically in this case, it appears encoded which means it is data -- a literal '?' that appears as part of the path segment. This
    is as opposed to the decoded '?' that appears in the URI which is not part of the path but rather the delimiter to the query.
  </p><p>
    Usually when developers talk about decoding the URI what they really want is the raw data from the URI. The raw decoded data is (C) above. The only thing to note beyond what's covered already is
    that to obtain the decoded data one must parse the URI before percent decoding all percent-encoded octets.
  </p><p>
    Of course the exception here is when a URI <i>is</i> the raw data. In this case you must percent-encode the URI to have it appear in another URI. More on percent-encoding while constructing URIs
    later.
  </p><div class="blogger-post-footer"><img width="1" height="1" src="https://blogger.googleusercontent.com/tracker/1670048653123050463-2514262428576226729?l=davescoolblog.blogspot.com" alt="" /></div></div></div>
