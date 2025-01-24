---
title: "Cdb/Windbg Commands for Runtime Patching"
date: 2016-02-08
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    You can use conditional breakpoints and debugging commands in windbg and cdb that together can amount to effectively patching a binary at runtime. This can be useful if you have symbols but you
    can't easily rebuild the binary. Or if the patch is small and the binary requires a great deal of time to rebuild.
  </p><h2>
    Skipping code
  </h2><p>
    If you want to skip a chunk of code you can set a breakpoint at the start address of the code to skip and set the breakpoint's command to change the instruction pointer register to point to the
    address at the end of the code to skip and go. Voila you're skipping over that code now. For example:
  </p><pre><code>bp 0x6dd6879b "r @eip=0x6dd687c3 ; g"</code></pre><h2>
    Changing parameters
  </h2><p>
    You may want to modify parameters or variables and this is simple of course. In the following example a conditional breakpoint ANDs out a bit from dwFlags. Now when we run its as if no one is
    passing in that flag.
  </p><pre><code>bp wiwi!RelativeCrack "?? dwFlags &amp;= 0xFDFFFFFF;g"</code></pre><p>
    Slightly more difficult is to modify string values. If the new string length is the same size or smaller than the previous, you may be able to modify the string value in place. But if the string
    is longer or the string memory isn't writable, you'll need a new chunk of memory into which to write your new string. You can use .dvalloc to allocate some memory and ezu to write a string into
    the newly allocated memory. In the following example I then overwrite the register containing the parameter I want to modify:
  </p><pre><code>.dvalloc 100<br />ezu 000002a9`d4eb0000 "mfcore.dll"<br />r rcx = 000002a9`d4eb0000</code></pre><h2>
    Calling functions
  </h2><p>
    You can also use .call to actually make new calls to methods or functions. Read more about that on the Old New Thing: <a href="https://blogs.msdn.microsoft.com/oldnewthing/20070427-00/?p=27083/">Stupid debugger tricks: Calling functions and methods</a>. Again, all of this can be used in a breakpoint command to
    effectively patch a binary.
  </p></div></div>
