---
title: "MSApp.getHtmlPrintDocumentSourceAsync - JavaScript UWP app printing"
date: 2017-10-11
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    The documentation for printing in JavaScript UWP apps is out of date as it all references <a href="https://msdn.microsoft.com/en-us/library/hh772325(v=vs.85).aspx">MSApp.getHtmlPrintDocumentSource</a> but that method has been replaced by MSApp.getHtmlPrintDocumentSourceAsync since WinPhone
    8.1.
  </p><h2>
    Background
  </h2><p>
    Previous to WinPhone 8.1 the WebView's HTML content ran on the UI thread of the app. This is troublesome for rendering arbitrary web content since in the extreme case the JavaScript of some
    arbitrary web page might just sit in a loop and never return control to your app's UI. With WinPhone 8.1 we added off thread WebView in which the WebView runs HTML content on a separate UI
    thread.
  </p><p>
    Off thread WebView required changing our MSApp.getHtmlPrintDocumentSource API which could no longer synchronously produce an HtmlPrintDocumentSource. With WebViews running on their own threads it
    may take some time for them to generate their print content for the HtmlPrintDocumentSource and we don't want to hang the app's UI thread in the interim. So the MSApp.getHtmlPrintDocumentSource
    API was replaced with MSApp.getHtmlPrintDocumentSourceAsync which returns a promise the resolved value of which is the eventual HtmlPrintDocumentSource.
  </p><h2>
    Sample
  </h2><p>
    However, the usage of the API is otherwise unchanged. So in sample code you see referencing MSApp.getHtmlPrintDocumentSource the sample code is still reasonable but you need to call
    MSApp.getHtmlPrintDocumentSourceAsync instead and wait for the promise to complete. For example the <a href="https://docs.microsoft.com/en-us/uwp/api/Windows.Graphics.Printing.PrintManager">PrintManager docs</a> has an example implementing a PrintTaskRequested event handler in a JavaScript UWP app.
  </p><pre><code>    function onPrintTaskRequested(printEvent) {    <br />        var printTask = printEvent.request.createPrintTask("Print Sample", function (args) {<br />            args.setSource(MSApp.getHtmlPrintDocumentSource(document));<br />    });</code></pre><p>
    Instead we need to obtain a deferral in the event handler so we can asynchronously wait for getHtmlPrintDocumentSourceAsync to complete:
  </p><pre><code>    function onPrintTaskRequested(printEvent) {    <br />        var printTask = printEvent.request.createPrintTask("Print Sample", function (args) {<br />            const deferral = args.getDeferral();<br />            MSApp.getHtmlPrintDocumentSourceAsync(document).then(htmlPrintDocumentSource =&gt; {<br />                args.setSource(htmlPrintDocumentSource);<br />                deferral.complete();<br />            }, error =&gt; {<br />                console.error("Error: " + error.message + " " + error.stack);<br />                deferral.complete();<br />            });<br />        });</code></pre></div></div>
