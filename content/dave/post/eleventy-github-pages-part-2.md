---
title: Eleventy on GitHub Pages (Part 2)
description: Building this blog using Eleventy and GitHub Pages
date: 2024-05-28
tags:
  - eleventy
  - github
  - dns
---
[Previously](eleventy-github-pages.md), I made an Eleventy based GitHub project with GitHub automation to run Eleventy when checking in changes. I stopped at that point because hooking in all my old blog's posts without changing their URIs sounded like a big pain, but now I've decided to go ahead and just link from old blog to new blog and not try to move them.

This time, I've hooked up a custom subdomain (dave.deletethis.net) to the GitHub output which was surprisingly easy:

1. GitHub has [docs on using a custom subdomain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-a-subdomain) which I followed mostly trouble free. The first step is in the GitHub project's Settings, Pages, Custom domain section to set your subdomain. However, this starts a domain check which fails because I haven't done the next step yet.
2. I had to edit my DNS records. Previously I had some A records for '*' subdomains which I removed because I realized they weren't in use and added a CNAME record for subdomain `dave` to `david-risney.github.io`.
3. After waiting a while (for the A record entries to expire) GitHub's domain check succeeded.
4. In step 3 GitHub will check in a file named `CNAME` to your `gh-pages` branch for you. However, I'm auto generating the contents of the `gh-pages` branch from my `main` branch. So I copy the `CNAME` file to the `public` folder. Eleventy will copy the contents of the public folder over directly.
5. Now that I'm using a custom domain I updated my `/eleventy.config.js` file's pathPrefix property to `/` since now the content is rooted at the root path of the domain rather than in a subfolder.
6. I also updated `/_data/metadata.js` to update the name of the blog and the URI of the blog.

After pushing all these changes I have my Eleventy GitHub blog running on a custom domain. In the future I need to update the template and see if I can start importing content from the old blog.