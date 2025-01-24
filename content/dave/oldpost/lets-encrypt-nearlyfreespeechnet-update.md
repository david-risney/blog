---
title: "Let's Encrypt NearlyFreeSpeech.net Update"
date: 2016-11-05
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    Since I had last <a href="https://deletethis.net/dave/2016-02/Let%27s+Encrypt+NearlyFreeSpeech.net+Setup">posted about using Let's Encrypt with NearlyFreeSpeech</a>, NFS has changed their process
    for setting TLS info. Instead of putting the various files in /home/protected/ssl and submitting an assistance request, now there is a command to submit the certificate info and a webpage for
    submitting the certificate info.
  </p><p>
    The webpage is <code>https://members.nearlyfreespeech.net/{username}/sites/{sitename}/add_tls</code> and has a textbox for you to paste in all the cert info in PEM form into the textbox. The
    domain key, the domain certificate, and the Let's Encrypt intermediate cert must be pasted into the textbox and submitted.
  </p><p>
    Alternatively, that same info may be provided as standard input to <code>nfsn -i set-tls</code></p><p>
    To renew my certificate with the updated NFS process I followed the commands from <a href="https://twitter.com/tehnicaorg">Andrei Damian-Fekete</a>'s script which depends on <a href="https://github.com/diafygi/acme-tiny">acme_tiny.py</a>:
  </p><pre><code>python acme_tiny.py --account-key account.key --csr domain.csr --acme-dir /home/public/.well-known/acme-challenge/ &gt; signed.crt<br />wget -O - https://letsencrypt.org/certs/lets-encrypt-x3-cross-signed.pem &gt; intermediate.pem<br />cat domain.key signed.crt intermediate.pem &gt; chained.pem<br />nfsn -i set-tls &lt; chained.pem</code></pre>Because
  my certificate had already expired I needed to comment out the section in acme_tiny.py that validates the challenge file. The filenames in the above map to the following:
  <ul><li>signed.crt is the Let's Encrypt provided certificate
    </li><li>account.key is the user private key registered with LE
    </li><li>domain.csr is the cert request
    </li><li>domain.key is the key for the domain cert
    </li></ul></div></div>
