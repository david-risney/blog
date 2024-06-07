---
title: "Web Worker Initialization Race"
date: 2012-02-24
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    Elaborating on a previous brief post on the topic of <a href="http://deletethis.net/dave/?uri=http%3A%2F%2Flists.whatwg.org%2Fpipermail%2Fhelp-whatwg.org%2F2010-August%2F000606.html">Web Worker
    initialization race conditions</a>, there's two important points to avoid a race condition when setting up a Worker:
  </p><ol><li>The parent starts the communication posting to the worker.
    </li><li>The worker sets up its message handler in its first synchronous block of execution.
    </li></ol><p>
    For example the following has no race becaues the spec guarentees that messages posted to a worker during its first synchronous block of execution will be queued and handled after that block. So
    the worker gets a chance to setup its onmessage handler. No race:
  </p><pre><code>'parent.js':<br />   var worker = new Worker();<br />   worker.postMessage("initialize");<br /><br />'worker.js':<br />   onmessage = function(e) {<br />      // ...<br />   }</code></pre><p>
    The following has a race because there's no guarentee that the parent's onmessage handler is setup before the worker executes postMessage. Race (violates 1):
  </p><pre><code>'parent.js':<br />   var worker = new Worker();<br />   worker.onmessage = function(e) {<br />      // ...<br />   };<br /><br />'worker.js':<br />   postMessage("initialize");<br /></code></pre><p>
    The following has a race because the worker has no onmessage handler set in its first synchronous execution block and so the parent's postMessage may be sent before the worker sets its onmessage
    handler. Race (violates 2):
  </p><pre><code>'parent.js':<br />   var worker = new Worker();<br />   worker.postMessage("initialize");<br /><br />'worker.js':<br />   setTimeout(<br />      function() {<br />         onmessage = function(e) {<br />            // ...<br />         }<br />      },<br />      0);<br /></code></pre></div></div>
