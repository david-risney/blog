---
title: "Application Content URI Rules wildcard syntax"
date: 2017-05-31
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p><a href="https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/appxmanifestschema/element-applicationcontenturirules">Application Content URI Rules</a> (ACUR from now on) defines the bounds of
    the web that make up the Microsoft Store application. Package content via the ms-appx URI scheme is automatically considered part of the app. But if you have content on the web via http or https
    you can use ACUR to declare to Windows that those URIs are also part of your application. When your app navigates to URIs on the web those URIs will be matched against the ACUR to determine if
    they are part of your app or not. The documentation for how matching is done on the wildcard URIs in the ACUR Rule elements is not very helpful on MSDN so here are some notes.
  </p><h2>
    Rules
  </h2><p>
    You can have up to 100 Rule XML elements per ApplicationContentUriRules element. Each has a Match attribute that can be up to 2084 characters long. The content of the Match attribute is parsed
    with <a href="https://msdn.microsoft.com/en-us/library/ms775098(v=vs.85).aspx">CreateUri</a> and when matching against URIs on the web additional wildcard processing is performed. I’ll call the
    URI from the ACUR Rule the rule URI and the URI we compare it to found during app navigation the navigation URI.
  </p><p>
    The rule URI is matched to a navigation URI by URI component: scheme, username, password, host, port, path, query, and fragment. If a component does not exist on the rule URI then it matches any
    value of that component in the navigation URI. For example, a rule URI with no fragment will match a navigation URI with no fragment, with an empty string fragment, or a fragment with any value
    in it.
  </p><h2>
    Asterisk
  </h2><p>
    Each component except the port may have up to 8 asterisks. Two asterisks in a row counts as an escape and will match 1 literal asterisk. For scheme, username, password, query and fragment the
    asterisk matches whatever it can within the component.
  </p><h2>
    Host
  </h2><p>
    For the host, if the host consists of exactly one single asterisk then it matches anything. Otherwise an asterisk in a host only matches within its domain name label. For example,
    http://*.example.com will match http://a.example.com/ but not http://b.a.example.com/ or http://example.com/. And http://*/ will match http://example.com, http://a.example.com/, and
    http://b.a.example.com/. However the Store places restrictions on submitting apps that use the http://* rule or rules with an asterisk in the second effective domain name label. For example,
    http://*.com is also restricted for Store submission.
  </p><h2>
    Path
  </h2><p>
    For the path, an asterisk matches within the path segment. For example, http://example.com/a/*/c will match http://example.com/a/b/c and http://example.com/a//c but not http://example.com/a/b/b/c
    or http://example.com/a/c
  </p><p>
    Additionally for the path, if the path ends with a slash then it matches any path that starts with that same path. For example, http://example.com/a/ will match http://example.com/a/b and
    http://example.com/a/b/c/d/e/, but not http://example.com/b/.
  </p><p>
    If the path doesn’t end with a slash then there is no suffix matching performed. For example, http://example.com/a will match only http://example.com/a and no URIs with a different path.
  </p><p>
    As a part of parsing the rule URI and the navigation URI, CreateUri will perform URI normalization and so the hostname and scheme will be made lower case (casing matters in all other parts of the
    URI and case sensitive comparisons will be performed), IDN normalization will be performed, ‘.’ and ‘..’ path segments will be resolved and other normalizations as described in the CreateUri
    documentation.
  </p></div></div>
