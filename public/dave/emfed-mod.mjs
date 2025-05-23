/* esm.sh - esbuild bundle(emfed@1.5.0) esnext production */
async function l(e,t,n,a){let s=new URL(e),o=t??await(async()=>{let c=/@(\w+)$/.exec(s.pathname);if(!c)throw"not a Mastodon user URL";let h=c[1],g=Object.assign(new URL(s),{pathname:"/api/v1/accounts/lookup",search:`?acct=${h}`});return(await(await fetch(g)).json()).id})(),f=Object.assign(new URL(s),{pathname:`/api/v1/accounts/${o}/statuses`,search:`?limit=${n??5}&exclude_replies=${!!a}`});return await(await fetch(f)).json()}async function i(e,t,n,a){let s=[];if(a===!1){let o=Object.assign(new URL(e),{pathname:`/api/v1/statuses/${t}`});s=[await(await fetch(o)).json()]}if(n===!1){let o=Object.assign(new URL(e),{pathname:`/api/v1/statuses/${t}/context`});s=[...s,...(await(await fetch(o)).json()).descendants]}return s}import w from"./dompurify.mjs";function u(e){return Object.assign(new String(e),{__safe:null})}function p(e){return typeof e>"u"||e===null?"":typeof e=="string"||e instanceof String?e.hasOwnProperty("__safe")?e:e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"):e.map(p).join("")}function r(e,...t){let n=e[0];for(let a=1;a<e.length;++a)n+=p(t[a-1]),n+=e[a];return u(n)}function d(e){let t=null;e.reblog&&(t={avatar:e.account.avatar,username:e.account.username,display_name:e.account.display_name,user_url:e.account.url},e=e.reblog);
let a=e.media_attachments.filter(s=>s.type==="image"),gifvs=e.media_attachments.filter(s=>s.type==="gifv"),videos=e.media_attachments.filter(s=>s.type==="video");
let monthString = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(e.created_at));
let date = new Date(e.created_at);
let timeString = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hourCycle: 'h12' }).format(new Date(e.created_at));
let n = `${date.getFullYear()} ${monthString} ${date.getDate()}, ${timeString}`;
return r`<li class="toot postlist-item" data-avatar="${e.account.avatar}"><img class="avatar" src="${e.account.avatar}" /><a class="user postlist-link" href="${e.url}">Post by <span class="display-name">${e.account.display_name}</span>
      <span class="username">@${e.account.username}</span>
    </a>
    <time class="postlist-date" datetime="${e.created_at}">${n}</time>
    ${u(w.sanitize(e.content))}
    ${a.map(s=>r` <a
          class="attachment"
          href="${s.url}"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            class="attachment"
            src="${s.preview_url}"
            alt="${s.description}"
          />
        </a>`)}
    ${gifvs.map(s=>r` <a
          class="attachment"
          href="${s.url}"
          target="_blank"
          rel="noopener noreferrer"
        >
          <video autoplay loop muted playsinline
            class="attachment"
            src="${s.url}"
            alt="${s.description}"
          />
        </a>`)}
    ${videos.map(s=>r` <a
          class="attachment"
          href="${s.url}"
          target="_blank"
          rel="noopener noreferrer"
        >
          <video controls
            class="attachment"
            src="${s.url}"
            alt="${s.description}"
          />
        </a>`)}
  </li>`.toString()}async function $(e){let t=e,n=await l(t.href,t.dataset.tootAccountId,Number(t.dataset.tootLimit??5),t.dataset.excludeReplies==="true"),a=document.createElement("ul");a.classList.add("toots", "posts"),t.replaceWith(a);for(let s of n){let o=d(s);a.insertAdjacentHTML("beforeend",o)}}async function y(e){let t=e,n=await i(t.href,String(t.dataset.tootId),t.dataset.excludeReplies==="true",t.dataset.excludePost==="true"),a=document.createElement("ul");a.classList.add("toots", "posts"),t.replaceWith(a);for(let s of n){let o=d(s);a.insertAdjacentHTML("beforeend",o)}}function m(){document.querySelectorAll("a.mastodon-feed").forEach($),document.querySelectorAll("a.mastodon-thread").forEach(y)}m();
//# sourceMappingURL=emfed.mjs.map