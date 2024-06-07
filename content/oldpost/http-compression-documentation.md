---
title: "HTTP Compression Documentation Reference"
date: 2012-06-13
---
<div xmlns="http://www.w3.org/1999/xhtml"><div>
  There's a lot of name reuse in HTTP compression so I've made the following to help myself keep it straight.
  <table border="1"><tr><th><a href="http://www.iana.org/assignments/http-parameters/http-parameters.xml">HTTP Content Coding Token</a></th><td><a href="http://tools.ietf.org/html/rfc2616.html#section-3.5">gzip</a></td><td><a href="http://tools.ietf.org/html/rfc2616.html#section-3.5">deflate</a></td><td><a href="http://tools.ietf.org/html/rfc2616.html#section-3.5">compress</a></td></tr><tr><th></th><td>
        An encoding format produced by the file compression program "gzip" (GNU zip)
      </td><td>
        The "zlib" format as described in RFC 1950.
      </td><td>
        The encoding format produced by the common UNIX file compression program "compress".
      </td></tr><tr><th>
        Data Format
      </th><td><a href="http://tools.ietf.org/html/rfc1952.html">GZIP file format</a></td><td><a href="http://tools.ietf.org/html/rfc1950.html">ZLIB Compressed Data Format</a></td><td>
        The <a href="http://en.wikipedia.org/wiki/Compress">compress program's</a> file format
      </td></tr><tr><th>
        Compression Method
      </th><td colspan="2"><a href="http://tools.ietf.org/html/rfc1951.html#page-6">Deflate compression method</a></td><td>
        LZW
      </td></tr><tr><th></th><td colspan="2">
        Deflate consists of <a href="http://en.wikipedia.org/wiki/LZ77">LZ77</a> and <a href="http://en.wikipedia.org/wiki/Huffman_coding">Huffman coding</a></td></tr></table><p>
    Compress doesn't seem to be supported by popular current browsers, possibly due to its past with patents.
  </p><p>
    Deflate isn't done correctly all the time. <a href="http://stackoverflow.com/questions/9170338/why-are-major-web-sites-using-gzip/9186091#9186091">Some servers would send the deflate data
    format</a> instead of the zlib data format and at least <a href="http://stackoverflow.com/a/2541174">some versions of Internet Explorer expect deflate data format</a> instead of zlib data format.
  </p></div></div>
