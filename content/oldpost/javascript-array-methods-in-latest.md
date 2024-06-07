---
title: "JavaScript Array methods in the latest browsers"
date: 2011-12-03
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    Cool and (relatively) <a href="http://dev.opera.com/articles/view/javascript-array-extras-in-detail/">new methods on the JavaScript Array object</a> are here in the most recent versions of your
    favorite browser! More about them on <a href="http://es5.github.com/#x15.4.4.16">ECMAScript5</a>, <a href="http://msdn.microsoft.com/en-us/library/k4h76zbx(v=VS.94).aspx">MSDN</a>, the <a href="http://blogs.msdn.com/b/ie/archive/2010/06/25/enhanced-scripting-in-ie9-ecmascript-5-support-and-more.aspx">IE blog</a>, or <a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array">Mozilla's</a> documentation. Here's the list that's got me excited:
  </p><dl><dt><a href="http://es5.github.com/#x15.4.4.17">some</a> &amp; <a href="http://es5.github.com/#x15.4.4.16">every</a></dt><dd>
      Does your callback function return true for any (some) or all (every) of the array's elements?
    </dd><dt><a href="http://es5.github.com/#x15.4.4.20">filter</a></dt><dd>
      Filters out elements for which your callback function returns false (in a new copy of the Array).
    </dd><dt><a href="http://es5.github.com/#x15.4.4.19">map</a></dt><dd>
      Each element is replaced with the result of it run through your callback function (in a new copy of the Array).
    </dd><dt><a href="http://es5.github.com/#x15.4.4.21">reduce</a> &amp; <a href="http://es5.github.com/#x15.4.4.22">reduceRight</a></dt><dd>
      Your callback is called on each element in the array in sequence (from start to finish in reduce and from finish to start in reduceRight) with the result of the previous callback call passed to
      the next. Reduce your array to a single value aggregated in any manner you like via your callback function.
    </dd><dt><a href="http://es5.github.com/#x15.4.4.18">forEach</a></dt><dd>
      Simply calls your callback passing in each element of your array in turn. I have vague performance concerns as compared to using a normal for loop.
    </dd><dt><a href="http://es5.github.com/#x15.4.4.14">indexOf</a> &amp; <a href="http://es5.github.com/#x15.4.4.15">lastIndexOf</a></dt><dd>
      Finds the first or last (respectively) element in the array that matches the provided value via strict equality operator and returns the index of that element or -1 if there is no such element.
      Surprisingly, no custom comparison callback method mechanism is provided.
    </dd><dd><div class="blogger-post-footer"><img width="1" height="1" src="https://blogger.googleusercontent.com/tracker/1670048653123050463-4312179088768580080?l=davescoolblog.blogspot.com" alt="" /></div></dd></dl></div></div>
