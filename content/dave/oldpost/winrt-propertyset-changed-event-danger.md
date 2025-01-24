---
title: "WinRT PropertySet Changed Event Danger"
date: 2013-07-08
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><div><p>
      The Windows Runtime API <a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.foundation.collections.propertyset.aspx">Windows.Foundation.Collections.PropertySet</a> class​ is a
      nice string name to object value map that has a changed event that fires when the contents of the map is modified. Be careful with this event because it fires synchronously from the thread on
      which the PropertySet was modified. If modified from the UI thread, the UI thread will then wait as it synchronously dispatches the changed event to all listeners which could lead to
      performance issues or especially from the UI thread deadlock. For instance, deadlock if you have two threads both trying to tell each other about changed events for different PropertySets.
    </p></div></div></div>
