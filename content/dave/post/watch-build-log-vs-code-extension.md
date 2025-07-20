---
title: WatchBuildLog VS Code Extension
description: WatchBuildLog VS Code extension for watching build logs in VS Code.
date: 2025-07-20
tags:
  - vscode
  - watch-build-log
  - chromium
---

I've made [WatchBuildLog](https://marketplace.visualstudio.com/items?itemName=DavidRisney.watchbuildlog), a VS Code extension that watches a build log file and parses out build errors for the VS Code Problems tab. The default build log paths and build error patterns match the Chromium build system. But you can change the log paths and error patterns in the settings.

There are other VS Code extensions for running the build from VS Code. But Chromium has so many different build targets and build options, that I want to continue building like I normally do from the command line. So rather than starting the build from VS Code, I stay in the command line unless there are errors I want to fix in VS Code, then I switch to VS Code, and the build errors are waiting for me.

## Development

This is my first VS Code extension. I used GitHub Copilot in part of its creation and it was a reasonable experience. I did end up rewriting most of the code as the generated code was unnecessarily complicated and missed edge cases. But having never made a VS Code extension, before it was convenient to have Copilot help me get started and get the basic structure of the extension.
