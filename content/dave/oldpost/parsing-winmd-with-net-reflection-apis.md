---
title: "Parsing WinMD with .NET reflection APIs"
date: 2016-11-02
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    Parsing WinMD files, the containers of WinRT API metadata, is relatively simple using the appropriate .NET reflection APIs. However, figuring out which reflection APIs to use is not obvious. I've
    got a completed <a href="https://github.com/david-risney/WinMDGraph/blob/master/WinMDTypes.cs">C sharp class parsing WinMD files</a> that you can check out for reference.
  </p><p>
    Use <code><a href="https://msdn.microsoft.com/en-us/library/system.reflection.assembly.reflectiononlyload(v=vs.110).aspx">System.Reflection.Assembly.ReflectionOnlyLoad</a></code> to load the
    WinMD file. Don't use the normal load methods because the WinMD files contain only metadata. This will load up info about APIs defined in that WinMD, but any references to types outside of that
    WinMD including types found in the normal OS system WinMD files must be resolved by the app code via the <code><a href="https://msdn.microsoft.com/en-us/library/system.runtime.interopservices.windowsruntime.windowsruntimemetadata.reflectiononlynamespaceresolve(v=vs.110).aspx">System.Reflection.InteropServices.WindowsRuntimeMetadata.ReflectionOnlyNamespaceResolve</a></code>
    event.
  </p><p>
    In this event handler you must resolve the unknown namespace reference by adding an assembly to the NamespaceResolveEventArgs's ResolvedAssemblies property. If you're only interested in OS system
    WinMD files you can use <code><a href="https://msdn.microsoft.com/en-us/library/hh138431(v=vs.110).aspx">System.Reflection.InteropServices.WindowsRuntimeMetadata.ResolveNamespace</a></code> to
    turn a namespace into the expected OS system WinMD path and turn that path into an assembly with ReflectionOnlyLoad.
  </p></div></div>
