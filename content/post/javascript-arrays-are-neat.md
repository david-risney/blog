---
title: JavaScript Arrays are neat
description: Interesting properties of JavaScript Arrays.
date: 2021-11-24
tags:
  - javascript
  - array
---
JavaScript arrays are unbelievable. If I told you the length property of an array is writable you might chuckle and say 'oh JavaScript'. But no, it goes all the way.

```js
const a = [1,2,3,4,5];
a.length = 3;
console.log(a.length); // 3
console.log(a.join(',')); // 1,2,3
```

This seems like a curve where folks very new to programming or very experienced with JavaScript know what this does and folks in the middle say that can't possibly work:

```js
--a.length;
```

As you'd expect given what decreasing length does, increasing length works similarly:

```js
const a = [1,2,3,4,5];
a.length = 7;
console.log(a.length); // 7
console.log(a.join(',')); // 1,2,3,4,5,,
```

The length property is not configurable so you can't delete it. There's something I like about telling JavaScript to delete length and its just like, 'nah'.

```js
let a = [1,2,3];
delete a.length; // false
```

More fun: The Array functions don't care if they act on an Array. They only require an object with numbered properties and a length property:

```js
let o = {'0':'b','1':'a','length':2};
Array.prototype.sort.call(o); // {0: 'a', 1: 'b', length: 2}
Array.prototype.slice.call(o, 1); // ['b']
```

Now that I have an object with a configurable `length` property I can delete the `length`. After that the Array functions don't like my object anymore. But they don't complain. They still produce something:

```js
delete o.length;
Array.prototype.slice.call(o, 1); // []
Array.prototype.join.call(o, ','); // ''
```
