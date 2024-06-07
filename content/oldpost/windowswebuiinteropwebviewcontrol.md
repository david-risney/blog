---
title: "Windows.Web.UI.Interop.WebViewControl localhost access"
date: 2018-07-25
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    If you're developing with the new <a href="https://docs.microsoft.com/en-us/uwp/api/windows.web.ui.interop.webviewcontrol">Windows.Web.UI.Interop.WebViewControl</a> you may have noticed you
    cannot navigate to localhost HTTP servers. This is because the WebViewControl's WebView process is a UWP process. All UWP processes by default cannot use the loopback adapter as a security
    precaution. For development purposes you can allow localhost access using the <a href="https://msdn.microsoft.com/en-us/library/windows/apps/hh780593.aspx">checknetisolation command line tool</a>
    on the WebViewControl's package just as you can for any other UWP app. The command should be the following:
  </p><pre><code>checknetisolation loopbackexempt -a -n=Microsoft.Win32WebViewHost_cw5n1h2txyewy</code></pre><p>
    As a warning checknetisolation is not good on errors. If you attempt to add a package but get its package family name wrong, checknetisolation just says OK:
  </p><pre><code>C:\Users\davris&gt;checknetisolation LoopbackExempt -a -n=Microsoft.BingWeather_4.21.2492.0_x86__8wekyb3d8bbwe<br />OK.</code></pre>And if you then list the result of the add with the
  bad name you'll see the following:
  <pre><code>[1] -----------------------------------------------------------------<br />    Name: AppContainer NOT FOUND<br />    SID:  S-1-15-...</code></pre><p>
    There's also a <a href="https://github.com/tiagonmas/Windows-Loopback-Exemption-Manager">UI tool for modifying loopback exemption</a> for packages available on GitHub and also one available with
    Fiddler.
  </p><p>
    As an additional note, I mentioned above you can try this for development. Do not do this in shipping products as this turns off the security protection for any consumer of the WebViewControl.
  </p></div></div>
