---
title: "Application Content URI Rule effects"
date: 2017-06-30
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    Previously I described <a href="https://deletethis.net/dave/2017-05/Application+Content+URI+Rules+wildcard+syntax">Application Content URI Rules (ACUR) parsing</a> and <a href="https://deletethis.net/dave/2017-06/Application+Content+URI+Rules+rule+ordering">ACUR ordering</a>. This post describes what you get from putting a URI in ACUR.
  </p><p>
    URIs in the ACUR gain the following which is otherwise unavailable:
  </p><ul><li>Geoloc API usage
    </li><li>Audio and video capture API usage
    </li><li>Pointer lock API usage
    </li><li>Web notifications API usage
    </li><li>IndexedDB API usage
    </li><li>Clipboard API usage
    </li><li>window.external.notify access from within webview
    </li><li>window.close the primary window
    </li><li>Top level navigation in the primary window
    </li><li>Cross origin XHR and fetch to ms-appx(-web) scheme URIs
    </li><li>Cross origin dirtied canvas read access if dirtied by ms-appx(-web) scheme URIs
    </li><li>Cross origin text track for video element for tracks from ms-appx(-web) scheme URIs
    </li></ul><p>
    URIs in the ACUR that also have full WinRT access additionally gain the following:
  </p><ul><li>Cross origin XHR and fetch
    </li><li>Cross origin dirtied canvas read access
    </li><li>Cross origin text track for video element
    </li><li>Local audio and video WinRT plugins work with media elements
    </li></ul></div></div>
