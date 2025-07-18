---
title: Time Travel Debugging WPT on Windows
description: How to use Time Travel Debugging with Web Platform Tests on Windows.
date: 2025-07-17
tags:
  - ttd
  - windows
  - wpt
---

I've had trouble getting Time Travel Debugging (TTD) working with debugging WPT from my chromium repo on Windows. Having finally gotten it working, I wanted to document the steps I took to get it working:

1. Follow the [install TTD instructions](https://learn.microsoft.com/en-us/windows-hardware/drivers/debuggercmds/time-travel-debugging-ttd-exe-command-line-util#how-to-download-and-install-the-ttdexe-command-line-utility-preferred-method). This will install the `Microsoft.TimeTravelDebugging` app package and will expose the `ttd.exe` command line executable.

2. Disable hardware enforced stack protection. See [Kernel-mode Hardware-enforced Stack Protection](https://learn.microsoft.com/en-us/windows-server/security/kernel-mode-hardware-stack-protection#enable-kernel-mode-hardware-enforced-stack-protection-in-windows-security) of where to find the option, but disable it. TTD cannot trace an executable with this enabled.

3. Add a WPT virtual test suite to pass in `--no-sandbox`. TTD doesn't work when Chromium sandboxing is on for a process. Edit `third_party/blink/web_tests/VirtualTestSuites` and add a new entry like the following:

```
  {
    "prefix": "no-sandbox",
    "platforms": [
      "Linux",
      "Mac",
      "Win"
    ],
    "bases": [ "" ],
    "args": [
      "--no-sandbox"
    ],
    "owners": [
      "example@example.com"
    ],
    "expires": "Jul 17, 2026"
  },
```

4. Run TTD to monitor the WPT headless_shell.exe processes. In an admin prompt run the following, but modify the `-out` path to wherever you want the TTD trace files to be created. Pick a path that can store files of several GBs in size. Leave this running.

```
Admin> ttd.exe -out C:\users\davris\tmp -monitor headless_shell.exe -noUI
```

5. Run your WPT tests using the virtual test suite, with timeouts extended, and using a release build in a non-admin prompt. Note in the following command the test starts with the test suite prefix `virtual/no-sandbox/` and the `--timeout-multiplier` is set to 5 to allow for the much slower execution when TTD tracing. 

```
Non-Admin> Q:\cr\src\third_party\blink\tools\run_wpt_tests -t Q:\cr\src\out\release_x64 virtual/no-sandbox/external/wpt/service-workers/service-worker/service-worker-header.https.html --no-retry-failures --verbose --driver-logging --timeout-multiplier 5
```

6. Once the WPT finishes you should find a bunch of `*.run` files in the output directory you specified in step 4. These are the TTD trace files. You can open them in WinDbg and use `!peb` to see the command line and which kind of chromium process kind. But usually the `.run` file of the renderer process you want is the last one and largest one, and for the browser process is the first one.