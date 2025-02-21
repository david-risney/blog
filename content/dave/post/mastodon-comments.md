---
title: Eleventy on GitHub Pages (Part 3)
description: Building this blog using Eleventy and GitHub Pages
date: 2025-02-02
tags:
  - eleventy
  - github
  - dns
---
[Previously](eleventy-github-pages-part-2.md), I made an Eleventy based GitHub project with GitHub automation to run Eleventy when checking in changes and hooked up a custom subdomain to the GitHub pages thinking I would start a new domain for the new blog. But I changed my mind again and now have my old URI pointing to the new blog:

1. I made a [PowerShell script](https://github.com/david-risney/blog/blob/main/feed-to-md.ps1) to take my old blog's atom XML and turn them into post MD files for Eleventy. It was more difficult than I thought because my atom was not valid XML (eek). Rather than write code to fix it, it was easier to just edit the XML by hand to fix.
2. I also customized my Eleventy URIs for blog posts to match my old blog's URIs. I added [post.11tydata.js files](https://github.com/david-risney/blog/blob/main/content/dave/post/post.11tydata.js) that setup the URI using custom JS functions. I define the functions in [eleventy.config.js](https://github.com/david-risney/blog/blob/main/eleventy.config.js) via `eleventyConfig.addFilter`.
3. That covered most of the static blog content. For the rest I made a new subdomain to point to the old server and added a [custom 404 page](https://github.com/david-risney/blog/blob/main/content/404.md?plain=1) that can help redirect to the old server. [GitHub Pages custom 404](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site) are supported by putting a 404.html in the root path.
4. I followed GitHub's directions for hooking up a top level domain name which was just to make A and AAAA records pointing to the GitHub IP addresses. It took a bit to populate but then worked great.
5. I forgot to update the CNAME file. Doing a push reset my domain for my github pages back to the previous name which no longer points to anything and broke the site. I fixed the content in the CNAME file to address the issue.

I'm going to call this transition complete! Its so much easier to work with Eleventy to add posts and not have to worry about server upgrades breaking things. For the new web content I've finished making a [sticky scroll animated header](css-scroll-animated-sticky-header.md) but still have thoughts for the future like a share button, and Mastodon based comments.