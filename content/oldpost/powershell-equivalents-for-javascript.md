---
title: "PowerShell Equivalents for JavaScript Array Functions"
date: 2012-05-15
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><h4>
    Built-in
  </h4><dl><dt>
      map
    </dt><dd>
      input | %{ expression($_) }
    </dd><dt>
      forEach
    </dt><dd>
      input | %{ [void]expression($_) }
    </dd><dt>
      filter
    </dt><dd>
      input | ?{ expression($_) }
    </dd><dt>
      indexOf
    </dt><dd>
      input.indexOf(value)
    </dd></dl><h4>
    Close to built-in
  </h4><dl><dt>
      some
    </dt><dd>
      if (input | ?{ expression($_) }) { ... }
    </dd><dt>
      every
    </dt><dd>
      if (-not input | ?{ !expression($_) }) { ... }
    </dd><dt>
      lastIndexOf
    </dt><dd>
      [array]::lastIndexOf(input, value)
    </dd></dl><h4>
    Write it yourself
  </h4><dl><dt>
      reduce
    </dt><dd>
      function reduce($fn, $a, $init) { $s = $init; $a | %{ $s = &amp;$fn $s $_; }; $s; }
    </dd></dl></div></div>
