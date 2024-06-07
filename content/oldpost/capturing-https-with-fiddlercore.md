---
title: "Capturing HTTPS with FiddlerCore"
date: 2011-04-06
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    I used <a href="http://fiddler.wikidot.com/fiddlercore">FiddlerCore</a> in <a href="http://deletethis.net/dave/dev/geolocmock/">GeolocMock</a> to edit HTTPS responses and ran into two stumbling
    blocks that I'll document here. The first is that I didn't check if the Fiddler root cert existed or was installed, which of course is necessary to edit HTTPS traffic. The following is my code
    where I check for the certs.
  </p><pre><code>    if (!Fiddler.CertMaker.rootCertExists())<br />    {<br />        if (!Fiddler.CertMaker.createRootCert())<br />        {<br />            throw new Exception("Unable to create cert for FiddlerCore.");<br />        }<br />    }<br /><br />    if (!Fiddler.CertMaker.rootCertIsTrusted())<br />    {<br />        if (!Fiddler.CertMaker.trustRootCert())<br />        {<br />            throw new Exception("Unable to install FiddlerCore's cert.");<br />        }<br />    }</code></pre><p>
    The second problem I had (which would have been solved had I read all the sample code first) was that my changes weren't being applied. In my app I only need the BeforeResponse but in order to
    modify the response I must also sign up for the BeforeRequest event and mark the bBufferResponse flag on the session before the response comes back. For example:
  </p><pre><code>    Fiddler.FiddlerApplication.BeforeRequest += new SessionStateHandler(FiddlerApplication_BeforeRequest);<br />    Fiddler.FiddlerApplication.BeforeResponse += new SessionStateHandler(FiddlerApplication_BeforeResponse);<br />...<br />    private void FiddlerApplication_BeforeRequest(Session oSession)<br />    {<br />        if (IsInterestingSession(oSession))<br />        {<br />            oSession.bBufferResponse = true;<br />        }<br />    }</code></pre><div class="blogger-post-footer"><img width="1" height="1" src="https://blogger.googleusercontent.com/tracker/1670048653123050463-375553475007025353?l=davescoolblog.blogspot.com" alt="" /></div></div></div>
