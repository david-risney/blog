---
draft: true
title: Static Blog Mastodon Comments
description: Using Mastodon for a comment system on a static blog.
date: 2025-11-09
tags:
  - mastodon
  - blog
---
I'd like to integrate Mastodon threads as comments on my static blog. 
There are lots of examples of folks who have written blog posts about this already including:
* [Mastodon for comments on a Hugo static site](https://lauralisscott.com/blog/mastodon-comments-hugo-static-site/)
* [Comments for Static Website (with Mastodon)](https://www.winterstein.biz/blog/static-comments-for-static-website/)
* [Mastodon as comment system for your static blog](https://danielpecos.com/2022/12/25/mastodon-as-comment-system-for-your-static-blog/#:~:text=In%20this%20blog%20post%2C%20we%20will%20explore%20how,traditional%20comment%20systems%2C%20using%20simple%20HTML%20and%20JavaScript.)
* [Client-side comments with Mastodon on a static Hugo website](https://andreas.scherbaum.la/post/2024-05-23_client-side-comments-with-mastodon-on-a-static-hugo-website/)
... and many more!

So I'm not treading new ground. But I want this for my blog as well and I'd also like to learn more about web components. I'd like to:
* Create a web component
* As a module easy to include in any static blog
* Not specific to any particular static blog generator
* Not specific to any particular UI or app framework
* No server-side changes required of end user
* Minimal required configuration - only the Mastodon account of the blog post author
* Provide a default style sheet, but generate HTML in a way that it is easily styled via CSS from the blog post author.

The rest of this post is going to mostly be a specification of how I'd like it to work.

It will discover the Mastodon account of the blog post author via checking for `link[rel="me"]@href` or `a[rel="me"]@href` attributes in the blog post HTML and checking them in order to see if they point to a Mastodon account. The href should be in the form `https://instance/@username` which turns into the URI `https://instance/api/v1/accounts/lookup?acct=@username` to get the account metadata including the account ID needed for further API calls.
Optionally the end dev can specify an attribute on the web component to explicitly specify the Mastodon account of the blog post author.
It will take the Mastodon account and searching for toots that contain the URL of the current blog post.
The oldest toot by the blog post author containing the URL will be considered the equivalent of the the blog post itself and called the original toot.
The content of the original toot won't be displayed because it is assumed to be a toot that is summarizing and linking to the blog post.
The normal actions one can take on a Mastodon toot (reply, boost, favorite) will be available as buttons styled to indicate they are for the blog post, and will act upon the original toot.
The likes of the original toot will be rendered as a list of small avatars linking to the accounts that liked it.
All toot threads containing the original toot will be displayed as a comment tree below that.
Any other toot threads containing toots containing the URL will be displayed below that in chronological order of the post date of the root toot of the thread.

Visual customization should have 3 options:
* None: A default style sheet they can use with no customization
* Basic: Colors should be customizable via CSS variables as easy customization.
* Advanced: The HTML should be generated as a mostly flat hierarchy and make it easy to use CSS grid to style it via a custom style sheet.

Will provide a test page that loads different toots so the end dev can see how it looks with different content. Including, regular toots, toots with media attachments (images (square, tall, wide, with and without alt), video, audio, single attachment, multiple attachments), toots with emoji, toots with content warnings, toots with long content, toots with short content, toots with mentions, toots with hashtags, retoots, toots with long deep reply tree.

Additionally, we need a way to customize the format of dates. Something like the built-in `Intl.DateTimeFormat` options or perhaps some other date library - but I don't want to take dependencies.

We'll need a loading indicator while the Mastodon API calls are being made and an error message if they fail.

It will be useful to use a tree of different web components:
* MastodonComments: The main component that takes the configuration and manages loading and error states.
  * MastodonCommentsControls: The buttons to reply, boost, and favorite, plus the likes of the original toot 
  * MastodonTootThread: A component to display a toot thread.
    * MastodonToot: A component to display a single toot.

