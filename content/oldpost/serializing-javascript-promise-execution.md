---
title: "Serializing JavaScript Promise Execution"
date: 2013-08-10
---
<div xmlns="http://www.w3.org/1999/xhtml"><div>
  Occasionally I have need to run a set of unrelated promises in series, for instance an object dealing with a WinRT camera API that can only execute one async operation at a time, or an object
  handling postMessage message events and must resolve associated async operations in the same order it received the requests. The solution is very simply to keep track of the last promise and when
  adding a new promise in serial add a continuation of the last promise to execute the new promise and point the last promise at the result. I encapsulate the simple solution in a simple
  constructor:<br /><br /><pre><code>    function PromiseExecutionSerializer() {<br />        var lastPromise = WinJS.Promise.wrap(); // Start with an empty fulfilled promise.<br /><br />        this.addPromiseForSerializedExecution = function(promiseFunction) {<br />            lastPromise = lastPromise.then(function () {<br />                // Don't call directly so next promise doesn't get previous result parameter.<br />                return promiseFunction();<br />            });<br />        }<br />    }</code></pre><br />

  The only thing to watch out for is to ensure you don't pass the result of a previous promise onto a subsequent promise that is unrelated.
</div></div>
