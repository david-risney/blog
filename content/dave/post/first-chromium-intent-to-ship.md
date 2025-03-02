---
draft: true
title: My First Chromium Intent to Ship
description: Thoughts on my first time going through the Chromium Intent to Ship process
date: 2025-02-20
tags:
  - chromium
  - bug
  - software-development
---
I'm excited to have finished my first Chromium bug that required an Intent to 
Ship (I2S). I'm relatively new to working on Chromium including the processes like
creating `chromestatus.com` entries and starting an Intent to Ship thread. I was
surprised by the amount of process required for what I thought was going to be
a simpler bug fix. Regardless, it wasn't that bad especially considering the
process is to help ensure I don't break the billions of Chromium users.

## Initial info gathering

I picked out [a bug talking about a failing Web Platform Test](https://issues.chromium.org/issues/41337436) to fix.
The failing test is `service-workers/service-worker/clients-matchall-client-types.https.html` ([source](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/web_tests/external/wpt/service-workers/service-worker/clients-matchall-client-types.https.html), [wpt.live](https://wpt.live/service-workers/service-worker/clients-matchall-client-types.https.html)).
I could reproduce the issue with:
 * Building:
 > `autoninja chrome chrome_wpt_tests content_shell`

 * And running: 
 > `Q:\cr\src\third_party\blink\tools\run_web_tests.bat -t Q:\cr\src\out\debug_x64 external/wpt/service-workers/service-worker/clients-matchall-client-types.https.html`

I discovered that there are two ways to mark test failures to be ignored.  There's the global file [`third_party/blink/web_tests/TestExpectations`](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/web_tests/TestExpectations?q=path:third_party%2Fblink%2Fweb_tests%2FTestExpectations&ss=chromium) and then there's per-file like `third_party/blink/web_tests/external/wpt/[path to test folder]/[test name]-expected.txt` and in this case its disabled with a -expected.txt file. If I delete the -expected.txt file and rerun the test I see it fail as described in the bug.

I was very happily surprised that WPT has a history of the WPT running in different versions of popular browsers. I could see [my failing test's history](https://wpt.fyi/results/service-workers/service-worker/clients-matchall-client-types.https.html?label=master&label=experimental&aligned&q=service-workers%2Fservice-worker%2Fclients-matchall-client-types.https.html) that the test has been failing Chrome and Edge, and passing in FireFox and Safari.

## Understanding the test

Debugging the test HTML/JS in DevTools I can see that two asserts are failing while asserting that the service worker client URL is the test URL `.../clients-matchall-client-types-iframe.html`. But they fail because it instead is `.../url-modified-via-pushstate.html`. The test navigates an iframe to `clients-matchall-client-types-iframe.html` which uses `history.pushState()` to change the URL programmatically from the expected URL to `url-modified-via-pushstate.html`. 

The [service worker spec defines the client.url property](https://w3c.github.io/ServiceWorker/#client-url) as

> The url getter steps are to return this's associated service worker client's serialized creation URL.

And the [creation URL is defined in HTML spec](https://html.spec.whatwg.org/multipage/webappapis.html#concept-environment-creation-url) as

> A URL that represents the location of the resource with which this environment is associated. In the case of a Window environment settings object, this URL might be distinct from its global object's associated Document's URL, due to mechanisms such as history.pushState() which modify the latter.

So the test is specifically checking that using pushState to modify the document URL doesn't change the service worker client object's URL property - that the URL property should remain as the creation URL. But in Chromium it does not hence the failing asserts.

## Debugging

I wanted to use time travel debugging to record the test run, but the whole thing ran soooo slowly while tracing to make it unbearable and also caused the test to timeout. But I found that navigating to the test on wpt.live and debugging in the browser
worked just fine. The WPTs make it easy to rerun the tests so I can get them open in the browser, get windbg attached to the correct
processes, set the correct breakpoints, and then rerun the test.

I could see that the client URL property value was set via [`content::service_worker_client_utils::'anonymous namespace'::GetWindowClientInfo`](https://source.chromium.org/chromium/chromium/src/+/main:content/browser/service_worker/service_worker_client_utils.cc;l=144?q=content::service_worker_client_utils%20GetWindowClientInfo&ss=chromium%2Fchromium%2Fsrc) from the render frame host's URL:

```
return blink::mojom::ServiceWorkerClientInfo::New(
      render_frame_host->GetLastCommittedURL(),
```

This is an issue because the render frame host's URL is the document URL not the creation URL like its supposed to be.

### Incorrect first fix

My first fix was to pass down navigation context to know that we're navigating because of history.pushState and related APIs so we can skip updating the client URL.
This introduced a lot of changes in navigation code and across browser and renderer prrocess. And I was informed during code review
that we already have an internal notion of the creation URL. I discarded this change and made a new change using the existing
creation URL.

### Better fix

My [second fix](https://chromium-review.googlesource.com/c/chromium/src/+/6078347) was to use the existing internal notion of creation URL `ServiceWorkerClient::url()`. Rather than passing in the RenderFrameHost's URL I would pass in the existing creation URL. This made my fix much smaller and I could remove the navigation changes. But a new test WPT started failing. As it turns out the internal notion of creation URL was having its URL fragment stripped which is not appropriate. I tried removing the fragment stripping but various parts of service worker code asserted that the fragment was stripped and I could see the stripped creation URL getting used in various places. Rather than removing the fragment stripping, I added an additional member to store the full creation URL and pass that in for filling in the `Client.url` property.

While in there I was requested to refactor some code I was touching. This was no problem and there was existing similarly factored code I could sort of pattern it after.

We also had a long discussion between experts on if an error check should be silently ignore or CHECK and eventually went with DUMP_WILL_BE_CHECK to validate that it won't produce retail crashes.

## Intent to Ship

One of the first pieces of code review feedback I received was that I should go through the chromestatus.com / I2S process.
I was surprised unaware that we would go through these processes for bug fixes. But it makes sense in cases like this where
I could be changing existing behavior and potentially breaking existing Service Worker usage. 