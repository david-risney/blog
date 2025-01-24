---
title: "FitBit and WebOC Application Compatibility Errors"
date: 2013-08-29
---
<div xmlns="http://www.w3.org/1999/xhtml"><div>
  I just got a FitBit One from my wife. Unfortunately I had issues running their app on my Windows 8.1 Preview machine. But I recognized the errors as IE compatibility issues, for instance an IE
  dialog popup from the FitBit app telling me about an error in the app's JavaScript. Given <a href="http://deletethis.net/dave/?uri=http%3A%2F%2Fdavescoolblog.blogspot.com%2F2011%2F04%2Fie9-document-mode-in-weboc.html">my previous post on WebOC versioning</a> you may guess what I tried next. I
  went into the registry and tried out different browser mode and document mode versions until I got the FitBit software running without error. Ultimately I found the following registry value to work
  well ('FitBit connect.exe' set to DWORD decimal 8888).
  <pre><code>Windows Registry Editor Version 5.00<br /><br />[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Internet Explorer\Main\FeatureControl\FEATURE_BROWSER_EMULATION]<br />"Fitbit Connect.exe"=dword:000022b8<br /><br /></code></pre>For
  those familiar with the Windows registry the above should be enough. For those not familiar, copy and paste the above into notepad, save as a file named "fitbit.reg", and then double click the reg
  file and say 'Yes' to the prompt. Hopefully in the final release of Windows 8.1 this won't be an issue.
</div></div>
