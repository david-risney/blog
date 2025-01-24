---
title: "Console Build Window Jump Lists Tool"
date: 2010-12-13
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    I've made two simple command line tools related to the console window and Win7 jump lists. The source is available for both but neither is much more than the sort of samples you'd find on MSDN
    =).
  </p><ul><li><a href="http://deletethis.net/dave/dev/setappusermodelid/">SetAppUserModelId</a></li><li><a href="http://deletethis.net/dave/dev/setjumplist/">SetJumpList</a></li></ul><p>
    SetAppUserModelId lets you change the Application User Model ID for the current console window. The AppUserModelId is the value Win7 uses to group together icons on the task bar and is what the
    task bar's jump lists are associated with. The tool lets you change that as well as the icon and name that appear in the task bar for the window, and the command to launch if the user attempts to
    re-launch the application from its task bar icon.
  </p><p>
    SetJumpList lets you set the jump list associated with a particular AppUserModelId. You pass the AppUserModelId as the only parameter and then in its standard input you give it lines specifying
    items that should appear in the jump list and what to execute when those items are picked.
  </p><p>
    I put these together to make my build environment easier to deal with at work. I have to deal with multiple enlistments in many different branches and so I wrote a simple script around these two
    tools to group my build windows by branch name in the task bar, and to add the history of commands I've used to launch the build environment console windows to the jump list of each.
  </p><div class="blogger-post-footer"><img width="1" height="1" src="https://blogger.googleusercontent.com/tracker/1670048653123050463-4400209729821033414?l=davescoolblog.blogspot.com" alt="" /></div></div></div>
