---
title: "Words with Hints Windows 8 App Development Notes"
date: 2013-07-04
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><div><p>
      My second completed app for the Windows Store was <a href="http://apps.microsoft.com/windows/en-us/app/words-with-hints/e302a949-452d-4086-8261-4d93d2f4f53a/">Words with Hints</a> a companion
      to Words with Friends or other Scrabble like games that gives you *ahem* hints. You provide your tiles and optionally letters placed in a line on the board and Words with Hints gives you word
      options.
    </p><p>
      I wrote this the first time by building a regular expression to check against my dictionary of words which made for a slow app on the Surface. In subsequent release of the app I now spawn four
      web workers (one for each of the Surface's cores) each with its own fourth of my dictionary. Each fourth of the dictionary is a <a href="http://en.wikipedia.org/wiki/Trie">trie</a> which makes
      it easy for me to discard whole chunks of possible combinations of Scrabble letters as I walk the tree of possibilities.
    </p><p>
      The dictionaries are large and takes a noticeable amount of time to load on the Surface. The best performing mechanism I found to load them is as JavaScript source files that simply define
      their portion of the dictionary on the global object and synchronously (only on the worker so not blocking the UI thread). Putting them into .js files means they take advantage of <a href="http://msdn.microsoft.com/en-us/library/windows/apps/hh849088.aspx#take_advantage_of_bytecode_caching">bytecode caching</a> making them load faster. However because the data is mostly strings
      and not code there is a dramatic size increase when the app is installed. The total size of the four dictionary .js files is about 44Mb. The bytecode cache for the dictionary files is about
      double that 88Mb meaning the dictionary plus the bytecode cache is 132Mb.
    </p><p>
      To handle the bother of postMessage communication and web workers this was the first app in which I used my promise MessagePort project which I'll discuss more in the future.
    </p><p>
      This is the first app in which I used the <a href="http://msdn.microsoft.com/en-US/library/hh506371(v=msads.10).aspx">Microsoft Ad SDK</a>. It was difficult to find the install for the SDK and
      difficult to use their website, but once setup, the Ad SDK was easy to import into VS and easy to use in my app.
    </p></div></div></div>
