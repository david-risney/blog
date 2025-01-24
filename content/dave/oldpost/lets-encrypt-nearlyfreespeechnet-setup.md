---
title: "Let's Encrypt NearlyFreeSpeech.net Setup"
date: 2016-02-04
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    2016-Nov-5: <a href="https://deletethis.net/dave/2016-11/Let%27s+Encrypt+NearlyFreeSpeech.net+Update">Updated post</a> on using Let's Encrypt with NearlyFreeSpeech.net
  </p><p>
    I use NearlyFreeSpeech.net for my webhosting for my personal website and I've just finished setting up TLS via Let's Encrypt. The process was slightly more complicated than what you'd like from
    Let's Encrypt. So for those interested in doing the same on NearlyFreeSpeech.net, I've taken the following notes.
  </p><p>
    The standard Let's Encrypt client requires su/sudo access which is not available on NearlyFreeSpeech.net's servers. Additionally NFSN's webserver doesn't have any Let's Encrypt plugins installed.
    So I used the <a href="https://github.com/diafygi/letsencrypt-nosudo">Let's Encrypt Without Sudo client</a>. I followed the instructions listed on the tool's page with the addition of providing
    the "--file-based" parameter to sign_csr.py.
  </p><p>
    One thing the script doesn't produce is the chain file. But this topic "<a href="https://members.nearlyfreespeech.net/forums/viewtopic.php?t=8457">Let's Encrypt - Quick HOWTO for NSFN</a>" covers
    how to obtain that:
  </p><pre><code>curl -o domain.chn https://letsencrypt.org/certs/lets-encrypt-x1-cross-signed.pem</code></pre><p>
    Now that you have all the required files, on your NFSN server make the directory /home/protected/ssl and copy your files into it. This is described in the NFSN topic <a href="https://members.nearlyfreespeech.net/faq?q=TLSSetup#TLSSetup">provide certificates to NFSN</a>. After copying the files and setting their permissions as described in the previous link you submit
    an assistance request. For me it was only 15 minutes later that everything was setup.
  </p><p>
    After enabling HTTPS I wanted to have all HTTP requests redirect to HTTPS. The normal Apache documentation on how to do this doesn't work on NFSN servers. Instead the NFSN FAQ describes it in
    "<a href="https://members.nearlyfreespeech.net/faq?q=EnforceSSL#EnforceSSL">redirect http to https and HSTS</a>". You use the X-Forwarded-Proto instead of the HTTPS variable because of how NFSN's
    virtual hosting is setup.
  </p><pre><code>RewriteEngine on<br />RewriteCond %{HTTP:X-Forwarded-Proto} !https<br />RewriteRule ^.*$ https://%{SERVER_NAME}%{REQUEST_URI} [L,R=301]</code></pre><p>
    Turning on HSTS is as simple as adding the HSTS HTTP header. However, the description in the above link didn't work because my site's NFSN realm isn't on the latest Apache yet. Instead I added
    the following to my .htaccess. After I'm comfortable with everything working well for a few days I'll start turning up the max-age to the recommended minimum value of 180 days.
  </p><pre><code>Header set Strict-Transport-Security "max-age=3600;" </code></pre><p>
    Finally, to turn on CSP I started up Fiddler with my <a href="https://github.com/david-risney/CSP-Fiddler-Extension">CSP Fiddler extension</a>. It allows me to determine the most restrictive CSP
    rules I could apply and still have all resources on my page load. From there I found and removed inline script and some content loaded via http and otherwise continued tweaking my site and CSP
    rules.
  </p><p>
    After I was done I checked out my site on <a href="https://www.ssllabs.com/ssltest/">SSL Lab's SSL Test</a> to see what I might have done wrong or needed improving. The first time I went through
    these steps I hadn't included the chain file which the SSL Test told me about. I was able to add that file to the same files I had already previously generated from the Let's Encrypt client and
    do another NFSN assistance request and 15 minutes later the SSL Test had upgraded me from 'B' to 'A'.
  </p></div></div>
