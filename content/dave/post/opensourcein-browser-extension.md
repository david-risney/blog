---
title: OpenSourceIn Browser Extension
description: OpenSourceIn browser extension for opening source in the browser in VS Code and using GitHub Copilot to develop it.
date: 2025-07-16
tags:
  - software-development
  - chromium
  - browser-extension
  - ai
  - opensourcein
  - github-copilot
---
I've been writing (and using) a browser extension called [OpenSourceIn](https://github.com/david-risney/OpenSourceIn) that allows you to open the source code you're viewing in the browser into VS Code. It supports the web sites I use: GitHub, Azure DevOps, and the various Chromium development sites for bugs, code review, and source search. Working on Chromium I find myself very regularly switching between cs.chromium.org, issues.chromium.org, and chromium-review.googlesource.com and just wanted something to make it slightly easier to switch from the browser into the corresponding local source file. The best solution to this would be proper integration of these various sites into VS Code, but this provides good value for very little investment.

## Development

I used GitHub Copilot throughout the development of this extension and overall I'm not sure if it saved me time but probably helped me actually finish. My overall thoughts:

### Side project fatigue mitigation

I often get very interested and into a side project idea, but at this point in my life I can tell how many days I have before my focus and interest fails. GitHub Copilot helps me get through things like setting up the project, getting test infra setup, and so on that I might otherwise rathole on and not actually get to the project. It means I can start to see progress faster helping with my motivation.

### Creating C grade skeleton

Very similar to the above, the AI can help create a maybe C grade skeleton of the project. Its easier for me to work from this skeleton and fix things up then to start from scratch. I can run the skeleton and validate behavior as I go. I still end up rewriting maybe most of the code but I get to start with something that runs.

And for this phase of the project where I am just trying to get it to setup a skeleton I don't have to invest a lot of my focus and time. When I start a build of another project that's going to take a few minutes I can run what I have, look through the code and tell it what I want to see and how to see things setup.

When I first had it setup the project it included a bunch of popular dependencies that I really did not want. But its easy enough to go into the dependency list and remove these things and in the mean time I have a working project. 

### Works best when you know what you want

This was my first time trying to write a browser extension for a real purpose. I had a number of misconceptions about how browser extensions work. This led to several instances of me trying to get Copilot to write code that was not going to work. And talking to Copilot did not help. Its too much of a 'yes' person. I ask a question in a positive way and it gives me a positive answer. I rephrase my question in a negative way and it gives me a negative answer. I had to go read MDN on exactly how things actually work for browser extension developments.

Similarly I can't tell it to do large tasks like fully describe the options page. I need to understand how I want the code structured, and go one by one through the features.
