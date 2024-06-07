---
title: "URI Percent Encoding Ignorance Level 0 - Existence"
date: 2012-02-10
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    As a professional URI aficionado I deal with various levels of ignorance on URI percent-encoding (aka URI encoding, or URL escaping). The basest ignorance is with respect to the mere existence of
    percent-encoding. Percents in URIs are special: they always represent the start of a percent-encoded octet. That is to say, a percent is always followed by two hex digits that represents a value
    between 0 and 255 and doesn't show up in a URI otherwise.
  </p><p>
    The IPv6 textual syntax for scoped addresses uses the '%' to delimit the zone ID from the rest of the address. When it came time to define <a href="http://tools.ietf.org/html/rfc4007#page-19">how
    to represent scoped IPv6 addresses in URIs</a> there were two camps: Folks who wanted to use the IPv6 format as is in the URI, and those who wanted to encode or replace the '%' with a different
    character. The <a href="http://www.ietf.org/mail-archive/web/ipv6/current/msg04613.html">resulting thread</a> was more lively than what shows up on the IETF URI discussion mailing list.
    Ultimately we went with a percent-encoded '%' which means the percent maintains its special status and singular purpose.
  </p><div class="blogger-post-footer"><img width="1" height="1" src="https://blogger.googleusercontent.com/tracker/1670048653123050463-1229188482458380028?l=davescoolblog.blogspot.com" alt="" /></div></div></div>
