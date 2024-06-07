---
title: "Shout Text Windows 8 App Development Notes"
date: 2013-06-27
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    My first app for Windows 8 was <a href="http://apps.microsoft.com/windows/en-us/app/shout-text/d3c22289-d1f6-4ead-a9ef-17abd0e6345a">Shout Text</a>. You type into Shout Text, and your text is
    scaled up as large as possible while still fitting on the screen, as you type. It is the closest thing to a Hello World app as you'll find on the Windows Store that doesn't contain that phrase
    (by default) and I approached it as the simplest app I could make to learn about Windows modern app development and Windows Store app submission.
  </p><p>
    I rely on WinJS's default layout to use CSS transforms to scale up the user's text as they type. And they are typing into a simple content editable div.
  </p><p>
    The app was too simple for me to even consider using ads or charging for it which I learned more about in future apps.
  </p><p>
    The first interesting issue I ran into was that copying from and then pasting into the content editable div resulted in duplicates of the containing div with copied CSS appearing recursively
    inside of the content editable div. To fix this I had to catch the paste operation and remove the HTML data from the clipboard to ensure only the plain text data is pasted:
  </p><pre><code>        function onPaste() {<br />            var text;<br /><br />            if (window.clipboardData) {<br />                text = window.clipboardData.getData("Text").toString();<br />                window.clipboardData.clearData("Html");<br />                window.clipboardData.setData("Text", util.normalizeContentEditableText(text));<br />            }<br />        }<br />        shoutText.addEventListener("beforepaste", function () { return false; }, false);<br />        shoutText.addEventListener("paste", onPaste, false);</code></pre><p>
    I additionally found an issue in IE in which applying a CSS transform to a content editable div that has focus doesn't move the screen position of the user input caret - the text is scaled up or
    down but the caret remains the same size and in the same place on the screen. To fix this I made the following hack to reapply the current cursor position and text selection which resets the
    screen position of the user input caret.
  </p><pre><code>        function resetCaret() {<br />            setTimeout(function () {<br />                var cursorPos = document.selection.createRange().duplicate();<br />                cursorPos.select();<br />            }, 200);<br />        }<br /><br />        shoutText.attachEvent("onresize", function () { resetCaret(); }, true);</code></pre></div></div>
