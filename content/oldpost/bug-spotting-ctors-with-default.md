---
title: "Bug Spotting: Ctors with default parameters"
date: 2011-12-01
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    The following code compiled just fine but did not at all act in the manner I expected:
  </p><pre><code>BOOL CheckForThing(__in CObj *pObj, __in IFigMgr* pFigMgr, __in_opt LPCWSTR url)<br />{<br />    BOOL fCheck = FALSE;<br />    if (SubCheck(pObj))<br />    {<br />        ...</code></pre>I’m
  calling SubCheck which looks like:
  <pre><code>bool SubCheck(const CObj&amp; obj);</code></pre><p>
    Did you spot the bug? As you can see I should be passing in *pObj not pObj since the method takes a const CObj&amp; not a CObj*. But then why does it compile?
  </p><p>
    It works because CObj has a constructor with all but one param with default values and CObj is derived from IUnknown:
  </p><pre><code>CObj(__in_opt IUnknown * pUnkOuter, __in_opt LPCWSTR pszUrl = NULL);</code></pre>Accordingly C++ uses this constructor as an implicit conversion operator. So instead of passing in my
  CObj, I end up creating a new CObj on the stack passing in the CObj I wanted as the outer object which has a number of issues.
  <p>
    The lesson is unless you really want this behavior, don't make constructors with all but 1 or 0 default parameters. If you need to do that consider using the 'explicit' keyword on the
    constructor.
  </p><p>
    More info about <a href="http://stackoverflow.com/questions/174349/forcing-single-argument-constructors-to-be-explicit-in-c">forcing single argument constructors to be explicit</a> is available
    on stack overflow.
  </p><div class="blogger-post-footer"><img width="1" height="1" src="https://blogger.googleusercontent.com/tracker/1670048653123050463-8511896840448096081?l=davescoolblog.blogspot.com" alt="" /></div></div></div>
