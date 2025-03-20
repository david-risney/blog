---
title: Noobs WPT in Chromium learnings
description: Thoughts on my first time adding a WPT to Chromium
date: 2025-03-20
tags:
  - chromium
  - bug
  - software-development
  - wpt
---
I'm happy to have finished [my first Chromium bug that adds a WPT](https://chromium-review.googlesource.com/c/chromium/src/+/6322749).
Writing a WPT I found to be more fun than writing usual C++ based tests. But I did learn
a bunch from issues I ran into and otherwise that I want to record here.

## Background

The bug was [deferring registerProtocolHandler duriung prerendering](https://issues.chromium.org/issues/40288240). You can see the [spec change](https://storage.googleapis.com/spec-previews/WICG/nav-speculation/pull/283/diff/prerendering.html#extendedattrdef-delaywhileprerendering) that led to opening this bug. 

The actual bug fix was pretty simple. The existing (un)registerProtocolHandler code is already split into validation in the renderer process before calling into the browser process for the actual registration work. The bug requires doing the validation synchronously and deferring the registration work so the existing code was already setup very nicely for this change.

I found existing examples of deferring work ([service worker registration](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/modules/service_worker/service_worker_registration.cc?q=AddPostPrerenderingActivationStep&ss=chromium), [AutofillAgent](https://source.chromium.org/chromium/chromium/src/+/main:components/autofill/content/renderer/autofill_agent.cc?q=AddPostPrerenderingActivationStep&ss=chromium)) that shows using two functions to easily defer work:

 * Check if we're prerendering using [`Document::IsPrerendering`](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/modules/service_worker/service_worker_registration.cc?q=AddPostPrerenderingActivationStep&ss=chromium)
 * Defer work until after activation using [`Document::AddPostPrerenderingActivationStep`](https://source.chromium.org/search?q=AddPostPrerenderingActivationStep&ss=chromium)

## WPT learnings

Looking in WPT I could see existing tests for prerendering and for registerProtocolHandler so my plan for testing was to add WPTs. Specifically one to ensure validation occurs synchronously, that registration is deferred and unregistration is deferred. Working on this I learned a bunch of things from docs and from hitting and resolving issues. The rest of this is just my findings in no particular order.

### Wildcards

The `run_web_tests` / `run_wpt_tests` scripts don't let you use wildcards when specifying tests to run. But you can use a parameter that lets you specify tests that include a trailing wildcard. This encourages naming related tests with common prefixes. And you can do multiple rules separated by `::` (🤷)

```
Q:\cr\src\third_party\blink\tools\run_wpt_tests.bat -t Q:\cr\src\out\debug_x64  --isolated-script-test-filter external/wpt/html/browsers/history/the-location-interface/location-prototype*::external/wpt/html/browsers/history/the-location-interface/location-protocol*
```

### Sync'ing between chromium and WPT

[WPT has a github repo](https://github.com/web-platform-tests/wpt) but chromium has a great system setup to do two way sync'ing between the chromium repo and the WPT repo with a bot. When you make a CL in chromium and its getting ready to submit a bot will open a github PR to push the change to the WPT repo. There's also a system to sync WPT repo changes back to chromium.

So convenient!

### Manifest update 30s

When you call `run_w(eb|pt)_tests` by default it will parse the manifest JSON every time to collect a list of all tests and this takes about 30 seconds (for my machine). This is a pain, but if you haven't changed the list of tests then you skip this using the parameter `--no-manifest-update`.

### Virtual test folders

When referring to tests in `run_wpt_tests` you can refer to them by default using their path like `external/wpt/speculation-rules/prerender/protocol-handler-validation.html`. But some can be referred to exclusively by a [virtual test folder](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/web_tests/VirtualTestSuites?q=speculation-rules-prerender-target-hint&ss=chromium) in which case they have the virtual test folder prefix: `virtual/speculation-rules-prerender-target-hint/external/wpt/speculation-rules/prerender/protocol-handler-validation.html`

If a test is exclusive to a virtual test folder and you try to refer to it with the default name then `run_wpt_tests` says the test is skipped but won't say why. You may want to search [LUCI tests](https://luci-milo.appspot.com/ui/p/chromium/test-search?q=external%2Fwpt%2Fcontent-security-policy%2Fresource-hints%2Fprefetch-allowed-no-default.html) for a partial name of your test to find out its full and potentially virtual name.

### WPT name suffix `.https.html`

[WPT names](https://web-platform-tests.org/writing-tests/file-names.html) can have meaning from tags in the name. The big one for me is the `.https.html` tag which indicates the test must run using https. If you don't the test will run as http. I had trouble with this because when I went to debug the test its via `http://localhost` which although http it is localhost and chromium throws devs a bone and lets content run as if its via https. Accordingly it took me a bit to realize the issue was the test was running via http and so registerProtocolHandler just wasn't there.

### Testdriver browser extension `test_driver`

Some WPT need to do things a browser shouldn't allow script to do normally for example skipping end user UI. For this purpose there's a [Testdriver browser extension](https://web-platform-tests.org/writing-tests/testdriver-extension-tutorial.html) which exposes APIs to script like `test_driver.set_rph_registration_mode('autoAccept');` ([source](https://web-platform-tests.org/writing-tests/testdriver-extension-tutorial.html)). This specifically will make `registerProtocolHandler` not show UI to the end user and auto accept instead. I was worried about not being able to test `registerProtocolHandler` in WPTs before finding out about this. 

Because WPT has to work in Firefox and Safari as well, adding to Testdriver may require significant effort to ensure it works in these browsers.

### Debugging

My go to for debugging a WPT in the browser is via devtools. But if you're relying on the testdriver you won't be able to. I tried a few things:
    * Use `--enable-per-test-tracing` and (as long as your test isn't timing out) you'll get pftrace files created that you can open in about:tracing / [https://ui.perfetto.dev/](https://ui.perfetto.dev/)
    * Use `--driver-logging` / `--verbose` and the driver will log `console.log` messages to the console from any context (main test page, iframes, service workers)
    * Use ` --additional-driver-flag=--enable-logging --additional-driver-flag=--v=1` with `--driver-logging` to turn on additional chromium logging. But just `--driver-logging` will get you chromium error logging of at least --v=3 (?).

### content_shell

You can run WPT using two scripts. [`run_wpt_tests`](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/testing/run_web_platform_tests.md) is the newer and preferred way to run tests using chrome or headless test driver.  Tests are getting ported over to running this way.

[`run_web_tests`](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/testing/web_tests_in_content_shell.md#Running-WPT-Tests-in-Content-Shell) is the older way that uses content_shell to run tests. You have to build content_shell specifically and it replaces some parts of the product like replacing the `Browser` class with the `Shell` class. This was a big problem for me because I didn't realize that register protocol handler's main registration code is in `Browser::RegisterProtocolHandler` and `Browser::UnregisterProtocolHandler`.  Running in content_shell instead I get `Shell::RegisterProtocolHandler` and `Shell::UnregisterProtocolHandler` but the unregister method is empty. I couldn't figure out why my test wasn't working until I added logging to the unregister methods and could see what was missing.

### New test stability

When adding a new test its important to ensure there's no reliability issues. You can locally rerun a test 20 times using something like `--repeat-each 20` and validate that it continues to work. When you submit the change via chromium CL it will see you are adding a new test and run it many times to ensure this as well.

I had issues with my test sometimes failing but only on Mac. I hear that there are some reliabililty issues on specific Mac setups in the test lab and so I was recommended to allow for timeout from my tests on that group of Macs.

## Command line summary

run_wpt_tests:

```
Q:\cr\src\third_party\blink\tools\run_wpt_tests.bat -t Q:\cr\src\out\debug_x64  virtual/speculation-rules-prerender-target-hint/external/wpt/speculation-rules/prerender/protocol-handler-unregister.https.html --verbose --num-retries 0 --no-manifest-update -p chrome --repeat-each 20
```

run_web_tests:

```
Q:\cr\src\third_party\blink\tools\run_web_tests.bat -t Q:\cr\src\out\debug_x64  virtual/speculation-rules-prerender-target-hint/external/wpt/speculation-rules/prerender/protocol-handler-unregister.https.html --verbose --details --driver-logging --num-retries 0 --no-manifest-update --enable-per-test-tracing
```

| run_web_tests param | run_wpt_tests param | notes |
|-----|-----|-------|
| `--driver-logging` | `--verbose` | extra info and logging from tests and test infra. Includes chromium LOG statements |
| `--verbose --details` | n/a | print extra info for every test result |
| `--num-retries 0` | `--num-retries 0` | Don't retry failed tests |
| `--repeat-each 20` | `--repeat-each 20` | Rerun every test 20 times |
| `--no-manifest-update` | `--no-manifest-update` | Don't rebuild test list (30s) |
| `--enable-per-test-tracing` | n/a | Generate pftrace files for the test run |
