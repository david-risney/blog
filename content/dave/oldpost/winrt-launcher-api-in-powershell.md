---
title: "WinRT Launcher API in PowerShell"
date: 2016-03-31
---
<div xmlns="http://www.w3.org/1999/xhtml"><div>
  You can call WinRT APIs from PowerShell. Here's a short example using the WinRT Launcher API:
  <pre><code>[Windows.System.Launcher,Windows.System,ContentType=WindowsRuntime]<br />$uri = New-Object System.Uri "http://example.com/"<br />[Windows.System.Launcher]::LaunchUriAsync($uri)</code></pre>Note
  that like using WinRT in .NET, you use the System.Uri .NET class instead of the Windows.Foundation.Uri WinRT class which is not projected and under the covers the system will convert the System.Uri
  to a Windows.Foundation.Uri.
</div></div>
