---
title: "Subtleties of postMessage"
date: 2013-07-15
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><div><p>
      In IE10 and other new browsers one may create MessageChannel objects that have two MessagePorts each connected (w3c spec calls it entangled) to one another such that postMessage on one port
      results in the message event firing on the other. You can pass an array of ports as the last parameter to postMessage and they show up in the ports property of the message event arg.
    </p><h2>
      Origin
    </h2><p>
      The postMessage here is like the worker postMessage and unlike the window and iframe postMessage in that it applies no origin checking:
    </p><ol><li>No origin postMessage in workers and MessagePorts: <strong>postMessage(messageData, ports)</strong></li><li>Origin postMessage in windows and iframes: <strong>postMessage(messageData, targetOrigin, ports)</strong></li></ol><p>
      Unfortunately the origin isn't an optional parameter at the end to make the two postMessages have the same signature.
    </p><p>
      On the event handler side, the event arg always has an origin property. But in the no origin case it is always the empty string.
    </p><h2>
      Source
    </h2><p>
      There is also a source property on the message event arg which if set is an object that has a postMessage property allowing you to post back to your caller. It is set for the origin case,
      however, in the no origin case this property is null. This is somewhat reasonable because in the case of MessagePort and Workers there are only two endpoints so you always know the source of a
      message implicitly. Unlike the origin case in which any iframe or window can be calling postMessage on any other iframe or window and the caller is unknown. So not unreasonable but it would be
      nice if the source property was always set for consistency.
    </p><h2>
      MessageChannel start
    </h2><p>
      When a MessageChannel is created it has two MessagePorts, but until those ports are started they will queue up any messages they receive. Once started they will dispatch all queued messages.
      Ports don't have to be started to send messages.
    </p><p>
      A port may be started in two ways, either by explicitly calling the start method on the port, or by setting the onmessage callback property on the port. However, adding an event listener via
      addEventListener("message", does not start the port. It works this way in IE and Chrome and the spec states this as well.
    </p><p>
      The justification is that since you can have only one callback via onmessage that once set you must implicitly be ready to receive messages and its fine to start the port. As opposed to the
      addEventListener in which case the user agent cannot start implicitly because it doesn't know how many event listeners will be added.  I found <a href="http://www.w3.org/2011/11/01-geolocation-minutes.html">Hixie stating this justification</a> in geoloc meeting notes.
    </p><h2>
      Links
    </h2><p><a href="http://dev.w3.org/html5/postmsg/">W3C Spec</a></p><p><a href="http://dev.opera.com/articles/view/window-postmessage-messagechannel/">Opera introduction</a></p></div></div></div>
