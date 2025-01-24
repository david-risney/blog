---
title: "Features of image type input tags in HTML"
date: 2011-11-21
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    A bug came up the other day involving markup containing <code>&lt;input type="image" src="http://example.com/...</code>. I knew that "image" was a valid input type but it wasn't until that moment
    that I realized I didn't know what it did. Looking it up I found that it displays the specified image and when the user clicks on the image, the form is submitted with an additional two name
    value pairs: the x and y positions of the point at which the user clicked the image.
  </p><p>
    Take for example the following HTML:
  </p><pre><code>&lt;form action="http://example.com/"&gt;<br />&lt;input type="image" name="foo" src="http://deletethis.net/dave/images/davebefore.jpg"&gt;<br />&lt;/form&gt;</code></pre>If the user
  clicks on the image, the browser will submit the form with a URI like the following:<code>http://example.com/?foo.x=145&amp;foo.y=124</code>.
  <p>
    This seemed like an incredibly specific feature to be built directly into the language when this could instead be done with javascript. I looked a bit further and saw that its been in HTML since
    at least <a href="http://tools.ietf.org/html/rfc1866#section-8.1.2.5">HTML2</a>, which of course makes much more sense. Javascript barely existed at that point and sending off the user's click
    location in a form may have been the only way to do something interesting with that action.
  </p><div class="blogger-post-footer"><img width="1" height="1" src="https://blogger.googleusercontent.com/tracker/1670048653123050463-3312444837591781292?l=davescoolblog.blogspot.com" alt="" /></div></div></div>
