---
title: "WinRT Toast from PowerShell"
date: 2016-06-15
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    I've made a <a href="https://github.com/david-risney/PoshWinRT/blob/master/Show-Toast.ps1">PowerShell script to show system toast notifications</a> with WinRT and PowerShell. Along the way I
    learned several interesting things.
  </p><p>
    First off calling WinRT from PowerShell involves a strange syntax. If you want to use a class you write [-Class-,-Namespace-,ContentType=WindowsRuntime] first to tell PowerShell about the type.
    For example here I create a ToastNotification object:
  </p><pre><code>[void][Windows.UI.Notifications.ToastNotification,Windows.UI.Notifications,ContentType=WindowsRuntime];<br />$toast = New-Object Windows.UI.Notifications.ToastNotification -ArgumentList $xml;</code></pre>And
  here I call the static method CreateToastNotifier on the ToastNotificationManager class:
  <pre><code>[void][Windows.UI.Notifications.ToastNotificationManager,Windows.UI.Notifications,ContentType=WindowsRuntime];<br />$notifier = [Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier($AppUserModelId);</code></pre>With
  this I can call WinRT methods and this is enough to show a toast but to handle the click requires a little more work.
  <p>
    To handle the user clicking on the toast I need to listen to the Activated event on the Toast object. However Register-ObjectEvent doesn't handle WinRT events. To work around this I created a
    <a href="https://github.com/david-risney/PoshWinRT/blob/master/PoshWinRT/EventWrapper.cs">.NET event wrapper class</a> to turn the WinRT event into a .NET event that Register-ObjectEvent can
    handle. This is based on <a href="https://rkeithhill.wordpress.com/2013/09/30/calling-winrt-async-methods-from-windows-powershell/">Keith Hill's blog post on calling WinRT async methods in
    PowerShell</a>. With the event wrapper class I can run the following to subscribe to the event:
  </p><pre><code>function WrapToastEvent {<br />    param($target, $eventName);<br /><br />    Add-Type -Path (Join-Path $myPath "PoshWinRT.dll")<br />    $wrapper = new-object "PoshWinRT.EventWrapper[Windows.UI.Notifications.ToastNotification,System.Object]";<br />    $wrapper.Register($target, $eventName);<br />}<br /><br />[void](Register-ObjectEvent -InputObject (WrapToastEvent $toast "Activated") -EventName FireEvent -Action { <br />    ...<br />});</code></pre><p>
    To handle the Activated event I want to put focus back on the PowerShell window that created the toast. To do this I need to call the Win32 function SetForegroundWindow. Doing so from PowerShell
    is surprisingly easy. First you must tell PowerShell about the function:
  </p><pre><code>Add-Type @"<br />    using System;<br />    using System.Runtime.InteropServices;<br />    public class PInvoke {<br />        [DllImport("user32.dll")] [return: MarshalAs(UnmanagedType.Bool)]<br />        public static extern bool SetForegroundWindow(IntPtr hwnd);<br />    }<br />"@</code></pre>Then
  to call:
  <pre><code>[PInvoke]::SetForegroundWindow((Get-Process -id $myWindowPid).MainWindowHandle);</code></pre><p>
    But figuring out the HWND to give to SetForegroundWindow isn't totally straight forward. Get-Process exposes a MainWindowHandle property but if you start a cmd.exe prompt and then run PowerShell
    inside of that, the PowerShell process has 0 for its MainWindowHandle property. We must follow up process parents until we find one with a MainWindowHandle:
  </p><pre><code>$myWindowPid = $pid;<br />while ($myWindowPid -gt 0 -and (Get-Process -id $myWindowPid).MainWindowHandle -eq 0) {<br />    $myWindowPid = (gwmi Win32_Process -filter "processid = $($myWindowPid)" | select ParentProcessId).ParentProcessId;<br />}</code></pre></div></div>
