---
title: "PowerShell Script Batch File Wrapper"
date: 2011-05-22
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    I'm trying to learn and use PowerShell more, but plenty of other folks I know don't use PowerShell. To allow them to use my scripts I use the following cmd.exe batch file to make it easy to call
    PowerShell scripts. To use, just name the batch file name the same as the corresponding PowerShell script filename and put it in the same directory.<br /></p><pre><code>@echo off<br />if "%1"=="/?" goto help<br />if "%1"=="/h" goto help<br />if "%1"=="-?" goto help<br />if "%1"=="-h" goto help<br /><br />%systemroot%\system32\windowspowershell\v1.0\powershell.exe -ExecutionPolicy RemoteSigned -Command . %~dpn0.ps1 %*<br />goto end<br /><br />:help<br />%systemroot%\system32\windowspowershell\v1.0\powershell.exe -ExecutionPolicy RemoteSigned -Command help %~dpn0.ps1 -full<br />goto end<br /><br />:end</code></pre><p>
    Additionally for PowerShell scripts that modify the current working directory I use the following batch file:
  </p><pre><code>@echo off<br />if "%1"=="/?" goto help<br />if "%1"=="/h" goto help<br />if "%1"=="-?" goto help<br />if "%1"=="-h" goto help<br /><br />%systemroot%\system32\windowspowershell\v1.0\powershell.exe -ExecutionPolicy RemoteSigned -Command . %~dpn0.ps1 %*;(pwd).Path 1&gt; %temp%\%~n0.tmp 2&gt; nul<br />set /p newdir=</code></pre></div></div>
