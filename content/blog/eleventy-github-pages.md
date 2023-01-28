---
title: Eleventy on GitHub Pages
description: Building this blog using Eleventy and GitHub Pages
date: 2023-01-27
tags:
  - eleventy
  - github
---
I wanted to replace my existing blog solution with a simple markdown setup. I decided to give Eleventy a try and host it on GitHub Pages. Here are the steps I've taken so far:

1. Create a new GitHub project using [Elventy Base Blog](https://github.com/11ty/eleventy-base-blog) as a project template.
2. Used the yml from [How to deploy eleventy to github pages with github actions](https://www.rockyourcode.com/how-to-deploy-eleventy-to-github-pages-with-github-actions/) in a new file [`.github/workflows/build_eleventy.yml`](https://github.com/david-risney/blog/blob/main/.github/workflows/build_eleventy.yml).
3. I updated some version numbers, and added a permissions contents write per the [peaceiris/actions-gh-pages help](https://github.com/peaceiris/actions-gh-pages#%EF%B8%8F-first-deployment-with-github_token).
4. I also made sure to create the `gh-pages` branch.
5. And in the GitHub project's Settings | Pages, set Source to `Deploy from a branch` and Branch to `gh-pages`.
6. Then I needed to [update the pathPrefix setting](https://github.com/david-risney/blog/commit/583048de085a4dda89ef23f63b8a454ae889376a) to `/blog/` to match my project name.

With this I've got Eleventy mostly setup and running on GitHub with GitHub Pages to serve the blog and GitHub Actions to rebuild the site whenever I push. Next up, how do I find a better site layout? And after that, the much harder problem of can I move my existing blog content over to this? Maybe in the interim just merge this blog content into deletethis.net.