/* esm.sh - esbuild bundle(dompurify@3.1.0) esnext production */
var{entries:ut,setPrototypeOf:ot,isFrozen:Ht,getPrototypeOf:zt,getOwnPropertyDescriptor:Wt}=Object,{freeze:g,seal:L,create:mt}=Object,{apply:Ne,construct:De}=typeof Reflect<"u"&&Reflect;g||(g=function(o){return o});L||(L=function(o){return o});Ne||(Ne=function(o,l,r){return o.apply(l,r)});De||(De=function(o,l){return new o(...l)});var te=R(Array.prototype.forEach),it=R(Array.prototype.pop),j=R(Array.prototype.push),ie=R(String.prototype.toLowerCase),Se=R(String.prototype.toString),at=R(String.prototype.match),V=R(String.prototype.replace),Gt=R(String.prototype.indexOf),Bt=R(String.prototype.trim),O=R(Object.prototype.hasOwnProperty),S=R(RegExp.prototype.test),$=Yt(TypeError);function R(s){return function(o){for(var l=arguments.length,r=new Array(l>1?l-1:0),d=1;d<l;d++)r[d-1]=arguments[d];return Ne(s,o,r)}}function Yt(s){return function(){for(var o=arguments.length,l=new Array(o),r=0;r<o;r++)l[r]=arguments[r];return De(s,l)}}function a(s,o){let l=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ie;ot&&ot(s,null);let r=o.length;for(;r--;){let d=o[r];if(typeof d=="string"){let N=l(d);N!==d&&(Ht(o)||(o[r]=N),d=N)}s[d]=!0}return s}function Xt(s){for(let o=0;o<s.length;o++)O(s,o)||(s[o]=null);return s}function w(s){let o=mt(null);for(let[l,r]of ut(s))O(s,l)&&(Array.isArray(r)?o[l]=Xt(r):r&&typeof r=="object"&&r.constructor===Object?o[l]=w(r):o[l]=r);return o}function ne(s,o){for(;s!==null;){let r=Wt(s,o);if(r){if(r.get)return R(r.get);if(typeof r.value=="function")return R(r.value)}s=zt(s)}function l(){return null}return l}var rt=g(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Re=g(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Le=g(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),jt=g(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Oe=g(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Vt=g(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),st=g(["#text"]),lt=g(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ye=g(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ct=g(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),oe=g(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),$t=L(/\{\{[\w\W]*|[\w\W]*\}\}/gm),qt=L(/<%[\w\W]*|[\w\W]*%>/gm),Kt=L(/\${[\w\W]*}/gm),Zt=L(/^data-[\-\w.\u00B7-\uFFFF]/),Jt=L(/^aria-[\-\w]+$/),pt=L(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Qt=L(/^(?:\w+script|data):/i),en=L(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),dt=L(/^html$/i),tn=L(/^[a-z][.\w]*(-[.\w]+)+$/i),ft=Object.freeze({__proto__:null,MUSTACHE_EXPR:$t,ERB_EXPR:qt,TMPLIT_EXPR:Kt,DATA_ATTR:Zt,ARIA_ATTR:Jt,IS_ALLOWED_URI:pt,IS_SCRIPT_OR_DATA:Qt,ATTR_WHITESPACE:en,DOCTYPE_NAME:dt,CUSTOM_ELEMENT:tn}),nn=function(){return typeof window>"u"?null:window},on=function(o,l){if(typeof o!="object"||typeof o.createPolicy!="function")return null;let r=null,d="data-tt-policy-suffix";l&&l.hasAttribute(d)&&(r=l.getAttribute(d));let N="dompurify"+(r?"#"+r:"");try{return o.createPolicy(N,{createHTML(x){return x},createScriptURL(x){return x}})}catch{return console.warn("TrustedTypes policy "+N+" could not be created."),null}};function Tt(){let s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:nn(),o=i=>Tt(i);if(o.version="3.1.0",o.removed=[],!s||!s.document||s.document.nodeType!==9)return o.isSupported=!1,o;let{document:l}=s,r=l,d=r.currentScript,{DocumentFragment:N,HTMLTemplateElement:x,Node:ae,Element:be,NodeFilter:z,NamedNodeMap:Et=s.NamedNodeMap||s.MozNamedAttrMap,HTMLFormElement:_t,DOMParser:gt,trustedTypes:q}=s,K=be.prototype,ht=ne(K,"cloneNode"),At=ne(K,"nextSibling"),St=ne(K,"childNodes"),re=ne(K,"parentNode");if(typeof x=="function"){let i=l.createElement("template");i.content&&i.content.ownerDocument&&(l=i.content.ownerDocument)}let _,W="",{implementation:se,createNodeIterator:Rt,createDocumentFragment:Lt,getElementsByTagName:Ot}=l,{importNode:yt}=r,y={};o.isSupported=typeof ut=="function"&&typeof re=="function"&&se&&se.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:le,ERB_EXPR:ce,TMPLIT_EXPR:fe,DATA_ATTR:Nt,ARIA_ATTR:Dt,IS_SCRIPT_OR_DATA:bt,ATTR_WHITESPACE:Ie,CUSTOM_ELEMENT:It}=ft,{IS_ALLOWED_URI:Ce}=ft,u=null,Me=a({},[...rt,...Re,...Le,...Oe,...st]),m=null,we=a({},[...lt,...ye,...ct,...oe]),f=Object.seal(mt(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),G=null,ue=null,xe=!0,me=!0,Pe=!1,ke=!0,P=!1,ve=!0,C=!1,pe=!1,de=!1,k=!1,Z=!1,J=!1,Ue=!0,Fe=!1,Ct="user-content-",Te=!0,B=!1,v={},U=null,He=a({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ze=null,We=a({},["audio","video","img","source","image","track"]),Ee=null,Ge=a({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Q="http://www.w3.org/1998/Math/MathML",ee="http://www.w3.org/2000/svg",D="http://www.w3.org/1999/xhtml",F=D,_e=!1,ge=null,Mt=a({},[Q,ee,D],Se),Y=null,wt=["application/xhtml+xml","text/html"],xt="text/html",p=null,H=null,Pt=l.createElement("form"),Be=function(e){return e instanceof RegExp||e instanceof Function},he=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(H&&H===e)){if((!e||typeof e!="object")&&(e={}),e=w(e),Y=wt.indexOf(e.PARSER_MEDIA_TYPE)===-1?xt:e.PARSER_MEDIA_TYPE,p=Y==="application/xhtml+xml"?Se:ie,u=O(e,"ALLOWED_TAGS")?a({},e.ALLOWED_TAGS,p):Me,m=O(e,"ALLOWED_ATTR")?a({},e.ALLOWED_ATTR,p):we,ge=O(e,"ALLOWED_NAMESPACES")?a({},e.ALLOWED_NAMESPACES,Se):Mt,Ee=O(e,"ADD_URI_SAFE_ATTR")?a(w(Ge),e.ADD_URI_SAFE_ATTR,p):Ge,ze=O(e,"ADD_DATA_URI_TAGS")?a(w(We),e.ADD_DATA_URI_TAGS,p):We,U=O(e,"FORBID_CONTENTS")?a({},e.FORBID_CONTENTS,p):He,G=O(e,"FORBID_TAGS")?a({},e.FORBID_TAGS,p):{},ue=O(e,"FORBID_ATTR")?a({},e.FORBID_ATTR,p):{},v=O(e,"USE_PROFILES")?e.USE_PROFILES:!1,xe=e.ALLOW_ARIA_ATTR!==!1,me=e.ALLOW_DATA_ATTR!==!1,Pe=e.ALLOW_UNKNOWN_PROTOCOLS||!1,ke=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,P=e.SAFE_FOR_TEMPLATES||!1,ve=e.SAFE_FOR_XML!==!1,C=e.WHOLE_DOCUMENT||!1,k=e.RETURN_DOM||!1,Z=e.RETURN_DOM_FRAGMENT||!1,J=e.RETURN_TRUSTED_TYPE||!1,de=e.FORCE_BODY||!1,Ue=e.SANITIZE_DOM!==!1,Fe=e.SANITIZE_NAMED_PROPS||!1,Te=e.KEEP_CONTENT!==!1,B=e.IN_PLACE||!1,Ce=e.ALLOWED_URI_REGEXP||pt,F=e.NAMESPACE||D,f=e.CUSTOM_ELEMENT_HANDLING||{},e.CUSTOM_ELEMENT_HANDLING&&Be(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(f.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&Be(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(f.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(f.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),P&&(me=!1),Z&&(k=!0),v&&(u=a({},st),m=[],v.html===!0&&(a(u,rt),a(m,lt)),v.svg===!0&&(a(u,Re),a(m,ye),a(m,oe)),v.svgFilters===!0&&(a(u,Le),a(m,ye),a(m,oe)),v.mathMl===!0&&(a(u,Oe),a(m,ct),a(m,oe))),e.ADD_TAGS&&(u===Me&&(u=w(u)),a(u,e.ADD_TAGS,p)),e.ADD_ATTR&&(m===we&&(m=w(m)),a(m,e.ADD_ATTR,p)),e.ADD_URI_SAFE_ATTR&&a(Ee,e.ADD_URI_SAFE_ATTR,p),e.FORBID_CONTENTS&&(U===He&&(U=w(U)),a(U,e.FORBID_CONTENTS,p)),Te&&(u["#text"]=!0),C&&a(u,["html","head","body"]),u.table&&(a(u,["tbody"]),delete G.tbody),e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!="function")throw $('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw $('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');_=e.TRUSTED_TYPES_POLICY,W=_.createHTML("")}else _===void 0&&(_=on(q,d)),_!==null&&typeof W=="string"&&(W=_.createHTML(""));g&&g(e),H=e}},Ye=a({},["mi","mo","mn","ms","mtext"]),Xe=a({},["foreignobject","desc","title","annotation-xml"]),kt=a({},["title","style","font","a","script"]),je=a({},[...Re,...Le,...jt]),Ve=a({},[...Oe,...Vt]),vt=function(e){let t=re(e);(!t||!t.tagName)&&(t={namespaceURI:F,tagName:"template"});let n=ie(e.tagName),c=ie(t.tagName);return ge[e.namespaceURI]?e.namespaceURI===ee?t.namespaceURI===D?n==="svg":t.namespaceURI===Q?n==="svg"&&(c==="annotation-xml"||Ye[c]):!!je[n]:e.namespaceURI===Q?t.namespaceURI===D?n==="math":t.namespaceURI===ee?n==="math"&&Xe[c]:!!Ve[n]:e.namespaceURI===D?t.namespaceURI===ee&&!Xe[c]||t.namespaceURI===Q&&!Ye[c]?!1:!Ve[n]&&(kt[n]||!je[n]):!!(Y==="application/xhtml+xml"&&ge[e.namespaceURI]):!1},b=function(e){j(o.removed,{element:e});try{e.parentNode.removeChild(e)}catch{e.remove()}},Ae=function(e,t){try{j(o.removed,{attribute:t.getAttributeNode(e),from:t})}catch{j(o.removed,{attribute:null,from:t})}if(t.removeAttribute(e),e==="is"&&!m[e])if(k||Z)try{b(t)}catch{}else try{t.setAttribute(e,"")}catch{}},$e=function(e){let t=null,n=null;if(de)e="<remove></remove>"+e;else{let E=at(e,/^[\r\n\t ]+/);n=E&&E[0]}Y==="application/xhtml+xml"&&F===D&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");let c=_?_.createHTML(e):e;if(F===D)try{t=new gt().parseFromString(c,Y)}catch{}if(!t||!t.documentElement){t=se.createDocument(F,"template",null);try{t.documentElement.innerHTML=_e?W:c}catch{}}let T=t.body||t.documentElement;return e&&n&&T.insertBefore(l.createTextNode(n),T.childNodes[0]||null),F===D?Ot.call(t,C?"html":"body")[0]:C?t.documentElement:T},qe=function(e){return Rt.call(e.ownerDocument||e,e,z.SHOW_ELEMENT|z.SHOW_COMMENT|z.SHOW_TEXT|z.SHOW_PROCESSING_INSTRUCTION|z.SHOW_CDATA_SECTION,null)},Ut=function(e){return e instanceof _t&&(typeof e.nodeName!="string"||typeof e.textContent!="string"||typeof e.removeChild!="function"||!(e.attributes instanceof Et)||typeof e.removeAttribute!="function"||typeof e.setAttribute!="function"||typeof e.namespaceURI!="string"||typeof e.insertBefore!="function"||typeof e.hasChildNodes!="function")},Ke=function(e){return typeof ae=="function"&&e instanceof ae},I=function(e,t,n){y[e]&&te(y[e],c=>{c.call(o,t,n,H)})},Ze=function(e){let t=null;if(I("beforeSanitizeElements",e,null),Ut(e))return b(e),!0;let n=p(e.nodeName);if(I("uponSanitizeElement",e,{tagName:n,allowedTags:u}),e.hasChildNodes()&&!Ke(e.firstElementChild)&&S(/<[/\w]/g,e.innerHTML)&&S(/<[/\w]/g,e.textContent)||e.nodeType===7||ve&&e.nodeType===8&&S(/<[/\w]/g,e.data))return b(e),!0;if(!u[n]||G[n]){if(!G[n]&&Qe(n)&&(f.tagNameCheck instanceof RegExp&&S(f.tagNameCheck,n)||f.tagNameCheck instanceof Function&&f.tagNameCheck(n)))return!1;if(Te&&!U[n]){let c=re(e)||e.parentNode,T=St(e)||e.childNodes;if(T&&c){let E=T.length;for(let h=E-1;h>=0;--h)c.insertBefore(ht(T[h],!0),At(e))}}return b(e),!0}return e instanceof be&&!vt(e)||(n==="noscript"||n==="noembed"||n==="noframes")&&S(/<\/no(script|embed|frames)/i,e.innerHTML)?(b(e),!0):(P&&e.nodeType===3&&(t=e.textContent,te([le,ce,fe],c=>{t=V(t,c," ")}),e.textContent!==t&&(j(o.removed,{element:e.cloneNode()}),e.textContent=t)),I("afterSanitizeElements",e,null),!1)},Je=function(e,t,n){if(Ue&&(t==="id"||t==="name")&&(n in l||n in Pt))return!1;if(!(me&&!ue[t]&&S(Nt,t))){if(!(xe&&S(Dt,t))){if(!m[t]||ue[t]){if(!(Qe(e)&&(f.tagNameCheck instanceof RegExp&&S(f.tagNameCheck,e)||f.tagNameCheck instanceof Function&&f.tagNameCheck(e))&&(f.attributeNameCheck instanceof RegExp&&S(f.attributeNameCheck,t)||f.attributeNameCheck instanceof Function&&f.attributeNameCheck(t))||t==="is"&&f.allowCustomizedBuiltInElements&&(f.tagNameCheck instanceof RegExp&&S(f.tagNameCheck,n)||f.tagNameCheck instanceof Function&&f.tagNameCheck(n))))return!1}else if(!Ee[t]){if(!S(Ce,V(n,Ie,""))){if(!((t==="src"||t==="xlink:href"||t==="href")&&e!=="script"&&Gt(n,"data:")===0&&ze[e])){if(!(Pe&&!S(bt,V(n,Ie,"")))){if(n)return!1}}}}}}return!0},Qe=function(e){return e!=="annotation-xml"&&at(e,It)},et=function(e){I("beforeSanitizeAttributes",e,null);let{attributes:t}=e;if(!t)return;let n={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:m},c=t.length;for(;c--;){let T=t[c],{name:E,namespaceURI:h,value:M}=T,X=p(E),A=E==="value"?M:Bt(M);if(n.attrName=X,n.attrValue=A,n.keepAttr=!0,n.forceKeepAttr=void 0,I("uponSanitizeAttribute",e,n),A=n.attrValue,n.forceKeepAttr||(Ae(E,e),!n.keepAttr))continue;if(!ke&&S(/\/>/i,A)){Ae(E,e);continue}P&&te([le,ce,fe],nt=>{A=V(A,nt," ")});let tt=p(e.nodeName);if(Je(tt,X,A)){if(Fe&&(X==="id"||X==="name")&&(Ae(E,e),A=Ct+A),_&&typeof q=="object"&&typeof q.getAttributeType=="function"&&!h)switch(q.getAttributeType(tt,X)){case"TrustedHTML":{A=_.createHTML(A);break}case"TrustedScriptURL":{A=_.createScriptURL(A);break}}try{h?e.setAttributeNS(h,E,A):e.setAttribute(E,A),it(o.removed)}catch{}}}I("afterSanitizeAttributes",e,null)},Ft=function i(e){let t=null,n=qe(e);for(I("beforeSanitizeShadowDOM",e,null);t=n.nextNode();)I("uponSanitizeShadowNode",t,null),!Ze(t)&&(t.content instanceof N&&i(t.content),et(t));I("afterSanitizeShadowDOM",e,null)};return o.sanitize=function(i){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=null,n=null,c=null,T=null;if(_e=!i,_e&&(i="<!-->"),typeof i!="string"&&!Ke(i))if(typeof i.toString=="function"){if(i=i.toString(),typeof i!="string")throw $("dirty is not a string, aborting")}else throw $("toString is not a function");if(!o.isSupported)return i;if(pe||he(e),o.removed=[],typeof i=="string"&&(B=!1),B){if(i.nodeName){let M=p(i.nodeName);if(!u[M]||G[M])throw $("root node is forbidden and cannot be sanitized in-place")}}else if(i instanceof ae)t=$e("<!---->"),n=t.ownerDocument.importNode(i,!0),n.nodeType===1&&n.nodeName==="BODY"||n.nodeName==="HTML"?t=n:t.appendChild(n);else{if(!k&&!P&&!C&&i.indexOf("<")===-1)return _&&J?_.createHTML(i):i;if(t=$e(i),!t)return k?null:J?W:""}t&&de&&b(t.firstChild);let E=qe(B?i:t);for(;c=E.nextNode();)Ze(c)||(c.content instanceof N&&Ft(c.content),et(c));if(B)return i;if(k){if(Z)for(T=Lt.call(t.ownerDocument);t.firstChild;)T.appendChild(t.firstChild);else T=t;return(m.shadowroot||m.shadowrootmode)&&(T=yt.call(r,T,!0)),T}let h=C?t.outerHTML:t.innerHTML;return C&&u["!doctype"]&&t.ownerDocument&&t.ownerDocument.doctype&&t.ownerDocument.doctype.name&&S(dt,t.ownerDocument.doctype.name)&&(h="<!DOCTYPE "+t.ownerDocument.doctype.name+`>
`+h),P&&te([le,ce,fe],M=>{h=V(h,M," ")}),_&&J?_.createHTML(h):h},o.setConfig=function(){let i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};he(i),pe=!0},o.clearConfig=function(){H=null,pe=!1},o.isValidAttribute=function(i,e,t){H||he({});let n=p(i),c=p(e);return Je(n,c,t)},o.addHook=function(i,e){typeof e=="function"&&(y[i]=y[i]||[],j(y[i],e))},o.removeHook=function(i){if(y[i])return it(y[i])},o.removeHooks=function(i){y[i]&&(y[i]=[])},o.removeAllHooks=function(){y={}},o}var an=Tt();export{an as default};
/*! Bundled license information:

dompurify/dist/purify.es.mjs:
  (*! @license DOMPurify 3.1.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.1.0/LICENSE *)
*/
//# sourceMappingURL=dompurify.mjs.map