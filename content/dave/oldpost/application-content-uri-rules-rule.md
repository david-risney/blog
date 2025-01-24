---
title: "Application Content URI Rules rule ordering"
date: 2017-06-01
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p><a href="https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/appxmanifestschema/element-applicationcontenturirules">Application Content URI Rules</a> (ACUR from now on) defines the bounds on
    the web that make up a Microsoft Store application. The previous blog post discussed <a href="https://deletethis.net/dave/2017-05/Application+Content+URI+Rules+wildcard+syntax">the syntax of the
    Rule's Match attribute</a> and this time I'll write about the interactions between the Rules elements.
  </p><h2>
    Order
  </h2><p>
    A single ApplicationContentUriRules element may have up to 100 Rule child elements. When determining if a navigation URI matches any of the ACUR the last Rule in the list with a matching match
    wildcard URI is used. If that Rule is an include rule then the navigation URI is determined to be an application content URI and if that Rule is an exclude rule then the navigation rule is not an
    application content URI. For example:
  </p><pre><code>Rule Type='include' Match='https://example.com/'/<br />Rule Type='exclude' Match='https://example.com/'/<br /></code></pre><p>
    Given the above two rules in that order, the navigation URI https://example.com/ is not an application content URI because the last matching rule is the exclude rule. Reverse the order of the
    rules and get the opposite result.
  </p><h2>
    WindowsRuntimeAccess
  </h2><p>
    In addition to determining if a navigation URI is application content or not, a Rule may also confer varying levels of WinRT access via the optional WindowsRuntimeAccess attribute which may be
    set to 'none', 'allowForWeb', or 'all'. If a navigation URI matches multiple different include rules only the last rule is applied even as it applies to the WindowsRuntimeAccess attribute. For
    example:
  </p><pre><code>Rule Type='include' Match='https://example.com/' WindowsRuntimeAccess='none'/<br />Rule Type='include' Match='https://example.com/' WindowsRuntimeAccess='all'/<br /></code></pre><p>
    Given the above two rules in that order, the navigation URI https://example.com/ will have access to all WinRT APIs because the last matching rule wins. Reverse the rule order and the navigation
    URI https://example.com/ will have no access to WinRT. There is no summation or combining of multiple matching rules - only the last matching rule wins.
  </p></div></div>
