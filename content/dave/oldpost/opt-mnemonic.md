---
title: "_opt Mnemonic"
date: 2011-05-24
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    ​I always have trouble remembering where the opt goes in <a href="http://msdn.microsoft.com/en-us/library/aa383701(VS.85).aspx">SAL</a> in the __deref_out case. The mnemonic is pretty simple: the
    _opt at the start of the SAL is for the pointer value at the start of the function. And the _opt at the end of the SAL is for the dereferenced pointer value at the end of the function.
  </p><br /><br /><br /><br /><br /><table><tr><th>
        SAL
      </th><th>
        foo == nullptr allowed at function start?
      </th><th>
        *foo == nullptr allowed at function end?
      </th></tr><tr><td>
        __deref_out void **foo
      </td><td>
        No
      </td><td>
        No
      </td></tr><tr><td>
        __deref<b>_opt</b>_out void **foo
      </td><td>
        Yes
      </td><td>
        No
      </td></tr><tr><td>
        __deref_out<b>_opt</b> void **foo
      </td><td>
        No
      </td><td>
        Yes
      </td></tr><tr><td>
        __deref<b>_opt</b>_out<b>_opt</b> void **foo
      </td><td>
        Yes
      </td><td>
        Yes
      </td></tr></table>.
  <div class="blogger-post-footer"><img width="1" height="1" src="https://blogger.googleusercontent.com/tracker/1670048653123050463-8290674282470951917?l=davescoolblog.blogspot.com" alt="" /></div></div></div>
