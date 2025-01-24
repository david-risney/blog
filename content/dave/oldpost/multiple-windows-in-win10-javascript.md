---
title: "Multiple Windows in Win10 JavaScript UWP apps"
date: 2018-03-10
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><h2>
    Win10 Changes
  </h2><p>
    In Win8.1 JavaScript UWP apps we supported multiple windows using MSApp DOM APIs. In Win10 we use window.open and window and a new MSApp API getViewId and the previous MSApp APIs are gone:
  </p><table><tbody><tr><td></td><th>
          Win10
        </th><th>
          Win8.1
        </th></tr><tr><th>
          Create new window
        </th><td><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/open">window.open</a></td><td><a href="https://msdn.microsoft.com/en-us/library/dn254975(v=vs.85).aspx">MSApp.createNewView</a></td></tr><tr><th>
          New window object
        </th><td><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window">window</a></td><td><a href="https://msdn.microsoft.com/en-us/library/dn268315(v=vs.85).aspx">MSAppView</a></td></tr><tr><th>
          viewId
        </th><td>
          MSApp.getViewId(window)
        </td><td><a href="https://msdn.microsoft.com/en-us/library/dn567969(v=vs.85).aspx">MSAppView.viewId</a></td></tr></tbody></table><h2>
    WinRT viewId
  </h2><p>
    We use window.open and window for creating new windows, but then to interact with WinRT APIs we add the MSApp.getViewId API. It takes a window object as a parameter and returns a viewId number
    that can be used with the various <a href="https://docs.microsoft.com/en-us/uwp/api/Windows.UI.ViewManagement.ApplicationViewSwitcher">Windows.UI.ViewManagement.ApplicationViewSwitcher</a> APIs.
  </p><h2>
    Delaying Visibility
  </h2><p>
    Views in WinRT normally start hidden and the end developer uses something like <a href="https://docs.microsoft.com/en-us/uwp/api/windows.ui.viewmanagement.applicationviewswitcher#Windows_UI_ViewManagement_ApplicationViewSwitcher_TryShowAsStandaloneAsync_System_Int32_">TryShowAsStandaloneAsync</a>
    to display the view once it is fully prepared. In the web world, window.open shows a window immediately and the end user can watch as content is loaded and rendered. To have your new windows act
    like views in WinRT and not display immediately we have added a window.open option. For example<br /><code>let newWindow = window.open("https://example.com", null, "msHideView=yes");</code></p><h2>
    Primary Window Differences
  </h2><p>
    The primary window that is initially opened by the OS acts differently than the secondary windows that it opens:
  </p><table><tbody><tr><td></td><th>
          Primary
        </th><th>
          Secondary
        </th></tr><tr><th>
          window.open
        </th><td>
          Allowed
        </td><td>
          Disallowed
        </td></tr><tr><th>
          window.close
        </th><td>
          Close app
        </td><td>
          Close window
        </td></tr><tr><th>
          Navigation restrictions
        </th><td>
          ACUR only
        </td><td>
          No restrictions
        </td></tr></tbody></table><p>
    The restriction on secondary windows such that they cannot open secondary windows could change in the future depending on feedback.
  </p><h2>
    Same Origin Communication Restrictions
  </h2><p>
    Lastly, there is a very difficult technical issue preventing us from properly supporting synchronous, same-origin, cross-window, script calls. That is, when you open a window that's same origin,
    script in one window is allowed to directly call functions in the other window and some of these calls will fail. postMessage calls work just fine and is the recommended way to do things if
    that's possible for you. Otherwise we continue to work on improving this.
  </p></div></div>
