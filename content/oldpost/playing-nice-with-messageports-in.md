---
title: "Considerate MessagePort Usage"
date: 2013-08-07
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><img align="right" alt="Sharing by leezie5. Two squirrels sharing food hanging from a bird feeder. Used under Creative Commons license Attribution-NonCommercial-NoDerivs 2.0 Generic." src="http://farm7.staticflickr.com/6013/5912219625_ece631b7e6_m.jpg" />When writing a JavaScript library that uses postMessage and the message event, I must be considerate of other JS code that will be
  running along side my library. I shouldn't assume I'm the only sender and receiver on a caller provided MessagePort object. This means obviously I should use addEventListener("message" rather than
  the onmessage property (see related <a href="http://blogs.msdn.com/b/oldnewthing/archive/2005/06/07/426294.aspx">What if two programs did this?</a>). But considering the actual messages traveling
  over the message channel I have the issue of accidentally processing another libraries messages and having another library accidentally process my own message. I have a few options for playing nice
  in this regard:<br /><dl><dt>
      Require a caller provided unique MessagePort
    </dt><dd>
      This solves the problem but puts a lot of work on the caller who may not notice nor follow this requirement.
    </dd><dt>
      Uniquely mark my messages
    </dt><dd>
      To ensure I'm acting upon my own messages and not messages that happen to have similar properties as my own, I place a 'type' property on my postMessage data with a value of a URN unique to me
      and my JS library. Usually because its easy I use a <a href="http://tools.ietf.org/html/rfc4122">UUID URN</a>. There's no way someone will coincidentally produce this same URN. With this I can
      be sure I'm not processing someone else's messages. Of course there's no way to modify my postMessage data to prevent another library from accidentally processing my messages as their own. I
      can only hope they take similar steps as this and see that my messages are not their own.
    </dd><dt>
      Use caller provided MessagePort only to upgrade to new unique MessagePort
    </dt><dd>
      I can also make my own unique MessagePort for which only my library will have the end points. This does still require the caller to provide an initial message channel over which I can
      communicate my new unique MessagePort which means I still have the problems above. However it clearly reduces the surface area of the problem since I only need once message to communicate the
      new MessagePort.
    </dd></dl>The best solution is likely all of the above.<br />
  Photo is <a href="http://www.flickr.com/photos/leeziet/5912219625/">Sharing</a> by <a href="http://www.flickr.com/photos/leeziet/">leezie5</a>. Two squirrels sharing food hanging from a bird
  feeder. Used under Creative Commons license Attribution-NonCommercial-NoDerivs 2.0 Generic.
</div></div>
