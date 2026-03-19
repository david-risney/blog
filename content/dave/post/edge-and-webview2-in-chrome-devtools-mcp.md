---
title: Edge and WebView2 in Chrome DevTools MCP
description: How to use Microsoft Edge and WebView2 with Chrome DevTools MCP
date: 2026-03-19
tags:
  - webview2
  - edge
  - chrome-devtools-mcp
---

The [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) is very useful! Although it is the **Chrome** DevTools MCP, it supports connecting to pretty much all chromium based browsers. This includes Microsoft Edge and WebView2 with a bit of extra configuration in `mcp.json`. The tool knows explicitly about Chrome, so you have to specify either the `--executablePath` for launch scenarios or `--userDataDir` for auto-connect scenarios.

## Edge Launch

To launch Edge you set the executablePath to point to your Edge binary. For example the following uses the Edge Dev channel on Windows:

```
"args": [
  "--registry",
  "https://registry.npmjs.org",
  "chrome-devtools-mcp@0.18.1",
  // Relevant part next:
  "--executablePath=C:\\Program Files (x86)\\Microsoft\\Edge Dev\\Application\\msedge.exe"
]
```

There are a few different locations where Edge could be installed so you'll need to ensure you have the correct one for your device.

Default Edge install paths (not definitive, may vary based on user configuration, version or group policies):

| OS | Channel | Path |
| -- | -- | -- |
| Windows | Stable | `%PROGRAMFILES(X86)%\Microsoft\Edge\Application\msedge.exe` |
| Windows | Beta | `%PROGRAMFILES(X86)%\Microsoft\Edge Beta\Application\msedge.exe` |
| Windows | Dev | `%PROGRAMFILES(X86)%\Microsoft\Edge Dev\Application\msedge.exe` |
| Windows | Canary | `%LOCALAPPDATA%\Microsoft\Edge SxS\Application\msedge.exe` |
| macOS | Stable | `/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge` |
| macOS | Beta | `/Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge` |
| macOS | Dev | `/Applications/Microsoft Edge Dev.app/Contents/MacOS/Microsoft Edge` |
| macOS | Canary | `/Applications/Microsoft Edge Canary.app/Contents/MacOS/Microsoft Edge` |
| Linux | Stable | `/usr/bin/microsoft-edge` |
| Linux | Beta | `/usr/bin/microsoft-edge-beta` |
| Linux | Dev | `/usr/bin/microsoft-edge-dev` |
| Linux | Canary | Not available |

## Edge Auto-connect

To auto-connect to Edge, you need to:

1. Setup Edge for remote debugging:
   1. Either use the `--remote-debugging-port=0` flag when launching Edge
   2. Or start Edge, navigate to `edge://inspect/#remote-debugging`, and enable remote debugging on that page
2. And then set the `--user-data-dir` to point to the Edge user data directory in `mcp.json`:

```
"args": [
  "--registry",
  "https://registry.npmjs.org",
  "chrome-devtools-mcp@0.18.1",
  // Relevant part next:
  "--autoConnect",
  "--user-data-dir=C:\\Users\\davris\\AppData\\Local\\Microsoft\\Edge Dev\\User Data"
]
```

Default Edge user data directories (not definitive, may vary based on user configuration, version or group policies):

| OS | Channel | Path |
| -- | -- | -- |
| Windows | Stable | `%LOCALAPPDATA%\Microsoft\Edge\User Data` |
| Windows | Beta | `%LOCALAPPDATA%\Microsoft\Edge Beta\User Data` |
| Windows | Dev | `%LOCALAPPDATA%\Microsoft\Edge Dev\User Data` |
| Windows | Canary | `%LOCALAPPDATA%\Microsoft\Edge SxS\User Data` |
| macOS | Stable | `~/Library/Application Support/Microsoft Edge` |
| macOS | Beta | `~/Library/Application Support/Microsoft Edge Beta` |
| macOS | Dev | `~/Library/Application Support/Microsoft Edge Dev` |
| macOS | Canary | `~/Library/Application Support/Microsoft Edge Canary` |
| Linux | Stable | `~/.config/microsoft-edge` |
| Linux | Beta | `~/.config/microsoft-edge-beta` |
| Linux | Dev | `~/.config/microsoft-edge-dev` |
| Linux | Canary | Not available |

## WebView2 Auto-connect

WebView2 is similar to the Edge auto-connect scenario. WebView2 doesn't have a launch scenario because its up to the host app to decide when to create a WebView2.

To auto-connect to WebView2, you need to:

1. Setup WebView2 for remote debugging using WebView2 loader overrides:
   1. Either use WebView2Utilities and follow the [How to: Auto open DevTools wiki page](https://github.com/david-risney/WebView2Utilities/wiki/How-to:-Auto-open-DevTools) but instead of checking the `Auto open DevTools` checkbox, type `--remote-debugging-port=0` in the `Arguments` textbox.
   2. Or manually create a registry value to set the AdditionalBrowserArguments after replacing `appname.exe` with the name of your WebView2 host executable.

```reg
[HKEY_CURRENT_USER\Software\Policies\Microsoft\Edge\WebView2\AdditionalBrowserArguments]
"appname.exe"="--remote-debugging-port=0"
```

2. And then set the `--user-data-dir` to point to the WebView2 user data directory in `mcp.json`. You'll need to discover the user data directory of the host app. You can use WebView2Utilities to do this as well, by going to the `Host Apps` tab, selecting your running host app, and looking at the `User data folder` row. For WebView2 user data folders, the path should end with `EBWebView`. This is automatically added by WebView2 so if you are copying the path from source code, you will need to add it yourself.

```
"args": [
    "--registry",
    "https://registry.npmjs.org",
    "chrome-devtools-mcp@0.18.1",
    // Relevant part next:
    "--autoConnect",
    "--user-data-dir=C:\\Users\\davris\\AppData\\Local\\Packages\\Microsoft.WinUI3ControlsGallery_8wekyb3d8bbwe\\LocalState\\EBWebView"
],
```