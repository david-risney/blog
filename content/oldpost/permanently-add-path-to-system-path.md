---
title: "Permanently Add Path to System PATH Environment Variable in PowerShell"
date: 2012-05-17
---
<div xmlns="http://www.w3.org/1999/xhtml"><div>
  According to <a href="http://sequelguy.tumblr.com/post/19438594681">MSDN</a> the proper way to permanently add a path to your system's PATH environment variable is by modifying a registry value.
  Accordingly this is easily represented in a PowerShell script that first checks if the path provided is already there and otherwise appends it:
  <pre><code>param([Parameter(Mandatory = $true)] [string] $Path);<br />$FullPathOriginal = (gp "HKLM:\System\CurrentControlSet\Control\Session Manager\Environment").Path;<br />if (!($FullPathOriginal.split(";") | ?{ $_ -like $Path })) {<br />    sp "HKLM:\System\CurrentControlSet\Control\Session Manager\Environment" -name Path -value ($FullPathOriginal + ";" +<br /> $Path);<br />}</code></pre></div></div>
