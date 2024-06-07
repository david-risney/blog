---
title: "MSVC++ 64bit Enums"
date: 2013-07-01
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><div><p>
      If you want to represent a value larger than 32bits in an enum in MSVC++ you can use C++0x style syntax to tell the compiler exactly what kind of integral type to store the enum values.
      Unfortunately by default an enum is always 32bits, and additionally while you can specify constants larger than 32bits for the enum values, they are silently truncated to 32bits.
    </p><p>
      For instance the following doesn't compile because Lorem::a and Lorem::b have the same value of '1':
    </p><pre><br /><code>enum Lorem {<br />    a = 0x1,<br />    b = 0x100000001<br />} val;<br /><br />switch (val) {<br />    case Lorem::a:<br />        break;<br />    case Lorem::b:<br />        break;<br />}<br /></code></pre><p>
      Unfortunately it is not an error to have b's constant truncated, and the previous without the switch statement does compile just fine:
    </p><pre><br /><code>enum Lorem {<br />    a = 0x1,<br />    b = 0x100000001<br />} val;<br /></code></pre><p>
      But you can explicitly specify that the enum should be represented by a 64bit value and get expected compiling behavior with the following:
    </p><pre><br /><code>enum Lorem : UINT64 {<br />    a = 0x1,<br />    b = 0x100000001<br />} val;<br /><br />switch (val) {<br />    case Lorem::a:<br />        break;<br />    case Lorem::b:<br />        break;<br />}<br /></code></pre></div></div></div>
