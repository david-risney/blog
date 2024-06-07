---
title: "Data breakpoints in JavaScript"
date: 2016-06-17
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    The other day I had to debug a JavaScript UWA that was failing when trying to use an undefined property. In a previous OS build this code would run and the property was defined. I wanted
    something similar to windbg/cdb's ba command that lets me set a breakpoint on read or writes to a memory location so I could see what was creating the object in the previous OS build and what
    that code was doing now in the current OS build. I couldn't find such a breakpoint mechanism in Visual Studio or F12 so I wrote a little script to approximate <a href="https://gist.github.com/david-risney/af6f7912ea171b9076d3ba3ebd54a355">JavaScript data breakpoints</a>.
  </p><script src="https://gist.github.com/david-risney/af6f7912ea171b9076d3ba3ebd54a355.js"></script><p>
    The script creates a stub object with a getter and setter. It actually performs the get or set but also calls debugger; to break in the debugger. In order to handle my case of needing to break
    when window.object1.object2 was created or accessed, I further had it recursively set up such stub objects for the matching property names.
  </p><p>
    Its not perfect because it is an enumerable property and shows up in hasOwnProperty and likely other places. But for your average code that checks for the existence of a property via if
    (object.property) it works well.
  </p></div></div>
