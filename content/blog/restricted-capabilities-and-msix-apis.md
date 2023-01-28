---
title: Restricted Capabilities and MSIX APIs
description: Short dive into restricted capabilities and MSIX APIs
date: 2022-09-16
tags:
  - uwp
  - msix
  - sysinternals
  - windows
  - restricted capabilities
---
SysInternals is in the Windows Store? This surprised me since last I knew you couldn't have admin-y utilities as appx packages in the Windows Store.

Taking a look at their appxmanifest, you can see how they've used restricted capabilities to get admin-like access to what they need. You can view the appxmanifest of any installed package using the `Get-AppxPackage` PowerShell command and the `Get-AppxPackageManifest` command:

```powershell
> (Get-AppxPackage *SysInternals* | Get-AppxPackageManifest).Package.Capabilities.OuterXml
```

(After formatting the results for you dear reader)

```xml
<rescap:Capability Name="runFullTrust"/>
<rescap:Capability Name="allowElevation"/>
<rescap:Capability Name="unvirtualizedResources"/>
```

These three [capabilities are all documented](https://docs.microsoft.com/en-us/windows/uwp/packaging/app-capability-declarations#restricted-capabilities):

 * `fullTrust` is to run desktop apps from an msix package.
 * `allowElevation` is to run your desktop app elevated.
 * `unvirtualizedResources` is to skip the normal registry and disk virtualization that is usually done to help sandbox packaged apps and desktop apps from messing with one another.

But do mere mortals such as you or I get to use restricted capabilities and get your own admin utility app into the Store? The docs say [there is an approval process](https://docs.microsoft.com/en-us/windows/uwp/packaging/app-capability-declarations#restricted-capability-approval-process) to use restricted capabilities in the Store so... maybe with extra scrutiny?

However, the [docs for `allowElevation`](https://docs.microsoft.com/en-us/windows/uwp/packaging/app-capability-declarations) are less encouraging:

> We don't recommend that you declare this capability in applications that you submit to the Microsoft Store. In most cases, the use of this capability won't be approved.

OK well, I appreciate the bluntness anyway. And elsewhere on that page it tries to steer me away

> Note that you can sideload apps that declare restricted capabilities without needing to receive any approval. Approval is only required when submitting these apps to the Store.

So is it still useful to package my utility desktop app as MSIX if I'm not going to put it in the Store? Yes!  There's a whole set of APIs that didn't exist last time I looked in this area. You can [check for and install updates to your MSIX app](https://learn.microsoft.com/en-us/windows/msix/non-store-developer-updates). And similar [docs on installing your non-Store MSIX](https://learn.microsoft.com/en-us/windows/msix/app-installer/installing-windows10-apps-web) in the first place.

(Incidentally that doc mentions how `ms-appinstaller:` has been disabled. I'd love to read more about what happened there but based on just the name of this URI scheme and my previous life working on URIs I'll make an educated guess.)

I started looking into all this to see if I should move WebView2Utilities over to MSIX and seems like I really should. Although until I get a [proper code signing certificate](https://learn.microsoft.com/en-us/windows/msix/app-installer/installing-windows10-apps-web#signing-the-app-package) seems like this isn't going to happen.

(Unless I just tell folks to do something dangerous like run a .ps1 file off the github repo that gets the msix, extracts and trusts its cert, then installs the msix...)