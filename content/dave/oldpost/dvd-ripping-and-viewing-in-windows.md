---
title: "DVD Ripping and Viewing in Windows Media Center"
date: 2010-08-17
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    I've just got a new media center PC connected directly to my television with lots of HD space and so I'm ripping a bunch of my DVDs to the PC so I don't have to fuss with the physical media. I'm
    ripping with <a href="http://lifehacker.com/355281/dvd-rip-automates-one+click-dvd-ripping">DVD Rip</a>, viewing the results in Windows 7's Windows Media Center after turning on the <a href="http://support.microsoft.com/kb/930526">WMC DVD Library</a>, and using a powershell script I wrote to copy over cover art and metadata.
  </p><p>
    My powershell script follows. To use it you must do the following:
  </p><ol><li>Run Windows Media Center with the DVD in the drive and view the disc's metadata info.
    </li><li>Rip each DVD to its own subdirectory of a common directory.
    </li><li>The name of the subdirectory to which the DVD is ripped must have the same name as the DVD name in the metadata. An exception to this are characters that aren't allowed in Windows paths (e.g.
    &lt;, &gt;, ?, *, etc)
    </li><li>Run the script and pass the path to the common directory containing the DVD rips as the first parameter.
    </li></ol>Running WMC and viewing the DVD's metadata forces WMC to copy the metadata off the Internet and cache it locally. After playing with Fiddler and reading this <a href="http://www.mediabrowser.tv/forum/viewtopic.php?f=9&amp;t=2934">blog post on WMC metadata</a> I made the following script that copies metadata and cover art from the WMC cache to the corresponding DVD
  rip directory.
  <p>
    Download <a href="http://deletethis.net/dave/wmce-zune-hack/copydvdinfo.ps1">copydvdinfo.ps1</a></p><div class="blogger-post-footer"><img width="1" height="1" src="https://blogger.googleusercontent.com/tracker/1670048653123050463-7418839341420694025?l=davescoolblog.blogspot.com" alt="" /></div></div></div>
