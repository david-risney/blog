---
title: "IE9 Document Mode in WebOC"
date: 2011-04-04
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    Working on <a href="http://deletethis.net/dave/dev/geolocmock/">GeolocMock</a> it took me a bit to realize why my HTML could use the W3C Geolocation API in IE9 but not in my WebBrowser control in
    my .NET application. Eventually I realized that I was getting the wrong IE doc mode. Reading this old <a href="http://blogs.msdn.com/b/ie/archive/2009/03/10/more-ie8-extensibility-improvements.aspx">More IE8 Extensibility Improvements IE</a> blog post from the IE blog I found the issue is that for app
    compat the WebOC picks older doc modes but an app hosting the WebOC can set a regkey to get different doc modes. The IE9 mode isn't listed in that article but I took a guess based on the values
    there and the decimal value 9999 gets my app IE9 mode. The following is the code I run in my application to set its regkey so that my app can get the IE9 doc mode and use the geolocation API.
  </p><br /><br /><pre><code>        static private void UseIE9DocMode()<br />        {<br />            RegistryKey key = null;<br />            try<br />            {<br />                key = Registry.CurrentUser.OpenSubKey("Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl\\FEATURE_BROWSER_EMULATION", true);<br />            }<br />            catch (Exception)<br />            {<br />                key = Registry.CurrentUser.CreateSubKey("Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl\\FEATURE_BROWSER_EMULATION");<br />            }<br />            key.SetValue(System.Diagnostics.Process.GetCurrentProcess().MainModule.ModuleName, 9999, RegistryValueKind.DWord);<br />            key.Close();<br />        }</code></pre><div class="blogger-post-footer"><img width="1" height="1" src="https://blogger.googleusercontent.com/tracker/1670048653123050463-7320694778093736225?l=davescoolblog.blogspot.com" alt="" /></div></div></div>
