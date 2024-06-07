---
title: "clip.exe - Useful tool I didn't know shipped with Windows"
date: 2011-05-26
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    When you run clip.exe, whatever comes into its standard input is put onto the clipboard. So when you need to move the result of something in your command window somewhere else you can pipe the
    result into clip.exe. Then you won't have to worry about the irritating way cmd.exe does block copy/pasting and you avoid having to manually fixup line breaks in wrapped lines. For instance, you
    can put the contents of a script into the clipboard with:
  </p><pre><code>more cdo.cmd | clip</code></pre><p>
    I've got a lot of stuff dumped in my bin folder that I sync across all my PCs so I didn't realize that clip.exe is a part of standard Windows installs.
  </p><p>
    Nice for avoiding the block copy in cmd.exe but I'd prefer to have the contents sort of tee'd into the clipboard and standard output. So TeeClip.ps1:
  </p><pre><code>$input | tee -var teeclipout | clip;<br />$teeclipout;</code></pre><div class="blogger-post-footer"><img width="1" height="1" src="https://blogger.googleusercontent.com/tracker/1670048653123050463-429703209805729186?l=davescoolblog.blogspot.com" alt="" /></div></div></div>
