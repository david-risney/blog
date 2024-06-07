---
title: "Stripe CTF - Level 5"
date: 2012-09-11
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p><a href="https://stripe-ctf.com/levels/5">Level 5</a> of the Stripe CTF revolved around a design issue in an OpenID like protocol.
  </p><h4>
    Code
  </h4><pre><code>    def authenticated?(body)<br />      body =~ /[^\w]AUTHENTICATED[^\w]*$/<br />    end<br /><br />...<br /><br />      if authenticated?(body)<br />        session[:auth_user] = username<br />        session[:auth_host] = host<br />        return "Remote server responded with: #{body}." \<br />               " Authenticated as #{username}@#{host}!"</code></pre><h4>
    Issue
  </h4><p>
    This level is an implementation of a federated identity protocol. You give it an endpoint URI and a username and password, it posts the username and password to the endpoint URI, and if the
    response is 'AUTHENTICATED' then access is allowed. It is easy to be authenticated on a server you control, but this level requires you to authenticate from the server running the level. This
    level only talks to stripe CTF servers so the first step is to upload a document to the <a href="http://deletethis.net/dave/?uri=http%3A%2F%2Fdavescoolblog.blogspot.com%2F2012%2F09%2Fstripe-ctf-input-validation-levels-1-2.html">level 2</a> server containing the text 'AUTHENTICATED' and we
    can now authenticate on a level 2 server. Notice that the level 5 server will dump out the content of the endpoint URI and that the regexp it uses to detect the text 'AUTHENTICATED' can match on
    that dump. Accordingly I uploaded an authenticated file to
  </p><pre><code>https://level02-2.stripe-ctf.com/user-ajvivlehdt/uploads/authenticated</code></pre>Using that as my endpoint URI means authenticating as level 2. I can then choose the following endpoint
  URI to authenticate as level 5.
  <pre><code>https://level05-1.stripe-ctf.com/user-qtoyekwrod/?pingback=https%3A%2F%2Flevel02-2.stripe-ctf.com%2Fuser-ajvivlehdt%2Fuploads%2Fauthenticated&amp;username=a&amp;password=a</code></pre>Navigating
  to that URI results in the level 5 server telling me I'm authenticated as level 2 and lists the text of the level 2 file 'AUTHENTICATED'. Feeding this back into the level 5 server as my endpoint
  URI means level 5 seeing 'AUTHENTICATED' coming back from a level 5 URI.
  <h4>
    Notes
  </h4><p>
    I didn't see any particular code review red flags, really the issue here is that the regular expression testing for 'AUTHENTICATED' is too permisive and the protocol itself doesn't do enough. The
    protocol requires only a set piece of common literal text to be returned which makes it easy for a server to accidentally fall into authenticating. Having the endpoint URI have to return variable
    text based on the input would make it much harder for a server to accidentally authenticate.
  </p></div></div>
