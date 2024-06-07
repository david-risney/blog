---
title: "Alternate IPv4 Forms - URI Host Syntax Notes"
date: 2012-03-14
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    By the <a href="http://tools.ietf.org/html/rfc3986#section-7.4">URI RFC</a> there is only one way to represent a particular IPv4 address in the host of a URI. This is the standard dotted decimal
    notation of four bytes in decimal with no leading zeroes delimited by periods. And no leading zeros are allowed which means there's only one textual representation of a particular IPv4 address.
  </p><p>
    However as discussed in the URI RFC, there are other forms of IPv4 addresses that although not officially allowed are generally accepted. Many implementations used <a href="http://www.freebsd.org/cgi/man.cgi?query=inet_aton&amp;apropos=0&amp;sektion=0&amp;manpath=FreeBSD+9.0-RELEASE&amp;arch=default&amp;format=html">inet_aton</a> to parse the address from the URI which accepts more
    than just dotted decimal. Instead of dotted decimal, each dot delimited part can be in decimal, octal (if preceded by a '0') or hex (if preceded by '0x' or '0X'). And that's each section
    individually - they don't have to match. And there need not be 4 parts: there can be between 1 and 4 (inclusive). In case of less than 4, the last part in the string represents all of the left
    over bytes, not just one.
  </p><p>
    For example the following are all equivalent:
  </p><dl><dt>
      192.168.1.1
    </dt><dd>
      Standard dotted decimal form
    </dd><dt>
      0300.0250.01.01
    </dt><dd>
      Octal
    </dd><dt>
      0xC0.0XA8.0x1.0X1
    </dt><dd>
      Hex
    </dd><dt>
      192.168.257
    </dt><dd>
      Fewer parts
    </dd><dt>
      0300.0XA8.257
    </dt><dd>
      All of the above
    </dd></dl><p>
    The bread and butter of URI related security issues is when one part of the system disagrees with another about the interpretation of the URI. So this non-standard, non-normal form syntax has
    been been a great source of security issues in the past. Its mostly well known now (<a href="http://msdn.microsoft.com/en-us/library/ie/ms775098(v=vs.85).aspx">CreateUri</a> normalizes these
    non-normal forms to dotted decimal), but occasionally a good tool for bypassing naive URI blocking systems.
  </p></div></div>
