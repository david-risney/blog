---
title: "Command line for finding missing URLACTIONs"
date: 2011-05-28
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    I wanted to ensure that my switch statement in my implementation of IInternetSecurityManager::ProcessURLAction had a case for every possible documented URLACTION. I wrote the following short
    command line sequence to see the list of all URLACTIONs in the SDK header file not found in my source file:
  </p><pre><code>grep URLACTION urlmon.idl | sed 's/.*\(URLACTION[a-zA-Z0-9_]*\).*/\1/g;' | sort | uniq &gt; allURLACTIONs.txt<br />grep URLACTION MySecurityManager.cpp | sed 's/.*\(URLACTION[a-zA-Z0-9_]*\).*/\1/g;' | sort | uniq &gt; myURLACTIONs.txt<br />comm -23 allURLACTIONs.txt myURLACTIONs.txt</code></pre>I'm
  not a sed expert so I had to read the <a href="http://www.gnu.org/software/sed/manual/sed.html">sed documentation</a>, and I heard about <a href="http://askawizard.blogspot.com/2008/01/some-handy-commands.html">comm from Kris Kowal's blog</a> which happilly was in the <a href="http://unxutils.sourceforge.net/">Win32 GNU tools pack</a> I
  already run.
  <p>
    But in my effort to learn and use PowerShell I found the following similar command line:
  </p><pre><code>diff <br />(more urlmon.idl | %{ if ($_ -cmatch "URLACTION[a-zA-Z0-9_]*") { $matches[0] } } | sort -uniq) <br />(more MySecurityManager.cpp | %{ if ($_ -cmatch "URLACTION[a-zA-Z0-9_]*") { $matches[0] } } | sort -uniq)</code></pre>In
  the PowerShell version I can skip the temporary files which is nice. 'diff' is mapped to 'compare-object' which seems similar to comm but with no parameters to filter out the different streams
  (although this could be done more verbosely with the ?{ } filter syntax). In PowerShell uniq functionality is built into sort. The builtin -cmatch operator (c is for case sensitive) to do regexp is
  nice plus the side effect of generating the $matches variable with the regexp results.
  <div class="blogger-post-footer"><img width="1" height="1" src="https://blogger.googleusercontent.com/tracker/1670048653123050463-4657842629995936098?l=davescoolblog.blogspot.com" alt="" /></div></div></div>
