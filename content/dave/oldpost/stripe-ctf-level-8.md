---
title: "Stripe CTF - Level 8"
date: 2012-12-07
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><a href="https://stripe-ctf.com/levels/8">Level 8</a> of the Stripe CTF is a password server that returns success: true if and only if the password provided matches the password stored directly via
  a RESTful API and optionally indirectly via a callback URI. The solution is side channel attack like a timing attack but with ports instead of time.<br /><br />
  (I found this in my drafts folder and had intended to post a while ago.)<br /><h4>
    Code
  </h4><pre><code>    def nextServerCallback(self, data):<br />        parsed_data = json.loads(data)<br />        # Chunk was wrong!<br />        if not parsed_data['success']:<br />            # Defend against timing attacks<br />            remaining_time = self.expectedRemainingTime()<br />            self.log_info('Going to wait %s seconds before responding' %<br />                          remaining_time)<br />            reactor.callLater(remaining_time, self.sendResult, False)<br />            return<br /><br />        self.checkNext()</code></pre><br /><h4>
    Issue
  </h4>The password server breaks the target password into four pieces and stores each on a different server. When a password request is sent to the main server it makes requests to the sub-servers
  for each part of the password request. It does this in series and if any part fails, then it stops midway through. Password requests may also be made with corresponding URI callbacks and after the
  server decides on the password makes an HTTP request on the provided URI callbacks saying if the password was success: true or false.<br />
  A timing attack looks at how long it took for a password to be rejected and longer times could mean a longer prefix of the password was correct allowing for a directed brute force attack. Timing
  attacks are prevented in this case by code on the password server that attempts to wait the same amount of time, even if the first sub-server responds with false. However, the server uses
  sequential outgoing port numbers shared between the requests to the sub-servers and the callback URIs. Accordingly, we can examine the port numbers on our callback URIs to direct a brute force
  attack.<br />
  If the password provided is totally incorrect then the password server will contact one sub-server and then your callback URI. So if you see the remote server's port number go up by two when
  requesting your callback URI, you know the password is totally incorrect. If by three then you know the first fourth of the password is correct and the rest is incorrect. If by four then two
  fourths of the password is correct. If by five then four sub-servers were contacted so you need to rely on the actual content of the callback URI request of 'success: true' or 'false' since you
  can't tell from the port change if the password was totally correct or not.<br />
  The trick in the real world is false positives. The port numbers are sequential over the system, so if the password server is the only thing making outgoing requests then its port numbers will also
  be sequential, however other things on the system can interrupt this. This means that the password server could contact three sub-servers and normally you'd see the port number increase by four,
  but really it could increase by four or more because of other things running on the system. To counteract this I ran in cycles: brute forcing the first fourth of the password and removing any entry
  that gets a two port increase and keeping all others. Eventually I could remove all but the correct first fourth of the password. And so on for the next parts of the password.<br />
  I wrote my app to brute force this in Python. This was my first time writing Python code so it is not pretty.<br /></div></div>
