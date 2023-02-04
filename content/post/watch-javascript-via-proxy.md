---
title: Watch JavaScript via Proxy
description: Use Proxy to watch how JavaScript uses your objects
date: 2022-02-24
tags:
  - javascript
  - proxy
---
JavaScript has a type `Proxy` that lets you intercept all interactions with an object - all property reads, writes, method calls, and so on. One fun thing you can do with this is watch how JavaScript itself interacts with your objects.

If we put a `Proxy` in another `Proxy` we can see how JavaScript uses our objects:

```js
function trace(obj, name) {
    return new Proxy(obj, new Proxy({}, { 
        get: (t, property, r) => 
            logCall.bind(null, name + ' ' + property, Reflect[property], Reflect)
    }));
}

function logCall(description, fn, fnThis, ...fnArgs) {
    try {
        const r = fn.call(fnThis, ...fnArgs);
        console.log(description + '\n\t', ...fnArgs, "\n  -->", r);
        return r;
    } catch (e) {
        console.log(description + '\n\t', ...fnArgs, "\n  -fail->", e);
        throw e;
    }
} 
```

## How this works

`trace` returns a `Proxy` around your object that uses `Reflect` to perform the normal `Proxy` operations but then `console.log` the call.

The constructor for `Proxy` takes two parameters: first the object you're wrapping, and second an object with functions for all the different kind of object interactions that you want to intercept. Because we want to just log the interaction and not do anything specific we can use a `Proxy` around `Reflect` to define this second parameter.

Our inner `Proxy` implements the handler of the outer `Proxy`. The handler is supposed to have methods called `get`, `set`, `apply` and others for each operation to intercept. Instead we define our inner `Proxy`s `get` to return a function that will perform the operation and log it using `logCall`. The function we pass in to `logCall` to run is one of the functions off of `Reflect`. `Reflect` defines all the `Proxy` handler functions `get`, `set`, `apply` and so on but where each just performs those operations. `Reflect` is like a convenient default for all `Proxy` handler functions. We want to perform the default operations but additionally log the result so using `Reflect` is exactly what we want.

## What you can do with it

With that you can call `trace` with an object and get out a `Proxy` that acts just like your object but also `console.log`s every `get`, `set`, `has`, `getOwnPropertyDescriptor`, and so on that JavaScript asks of your object.

You can watch how `Array.sort` sorts an array.

Or how `Array.toString` calls `Array.join`.

Or how `Array.concat` checks for `Symbol.isConcatSpreadable`.

Check out the corresponding ECMAScript standard and you can see how the logged Proxy calls match the standard defined steps for things like [Array.sort](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.sort).

Because I pass objects to `console.log` DevTools will show you an interactive object in the console. If you try it out the log is easier to understand than as text in the gist:

```log
array get 
        (3) [300, 200, 100] sort Proxy {0: 300, 1: 200, 2: 100} ) 
    --> ƒ sort() { [native code] }
```

The above is a [`Proxy` handler's get call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get). The first param is the array `(3) [300, 200, 100]` on which we will 'get'. The second param is the string `'sort'` that is the property to get. The third is our proxy.

I haven't tried wrapping the return values in trace Proxy although maybe that would give an even better picture of what's happening.

Various `Array` functions can operate on a `this` that is a not an `Array`. If you're trying to make a non-`Array` object work with `Array` functions, then using a `Proxy` to watch what JavaScript is doing can help debug.

### Watch a `for` loop

But Proxy watching works for other parts of JavaScript and not just standard functions. For example watch a `for` loop enumerate over your array:

```js
let arr = trace([300, 200, 100], 'array'); 
for (let name in arr) { }
```

And the log:

```log
array ownKeys
    (3) [300, 200, 100] 
  -->  (4) ['0', '1', '2', 'length']
array getPrototypeOf
    (3) [300, 200, 100] 
  -->  [constructor: ƒ, at: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, …]
array getOwnPropertyDescriptor
    (3) [300, 200, 100] 0 
  -->  {value: 300, writable: true, enumerable: true, configurable: true}
array getOwnPropertyDescriptor
    (3) [300, 200, 100] 1 
  -->  {value: 200, writable: true, enumerable: true, configurable: true}
array getOwnPropertyDescriptor
    (3) [300, 200, 100] 2 
  -->  {value: 100, writable: true, enumerable: true, configurable: true}
array getOwnPropertyDescriptor
    (3) [300, 200, 100] length 
  -->  {value: 3, writable: true, enumerable: false, configurable: false}
```

The `for` loop asks your object for the names of its properties and then the value of each.

### Watch `instanceof`

Or `instanceof` with your proxy on the left hand side

```js
arr instanceof String
```

And watch JavaScript get the prototype of array

```log
array getPrototypeOf
    (3) [300, 200, 100] 
  -->  [constructor: ƒ, at: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, …]
```

Or `instanceof` with your proxy on the right hand side

```js
String instanceof arr
```

And watch JavaScript ask your array for its `Symbol.hasInstance` property.

```log
array get
    (3) [300, 200, 100] Symbol(Symbol.hasInstance) Proxy(Array) {0: 300, 1: 200, 2: 100} 
  -->  undefined
```

(Here's a [related gist](https://gist.github.com/david-risney/120af7aadb3d3c946e85f46e3869a8eb).)
