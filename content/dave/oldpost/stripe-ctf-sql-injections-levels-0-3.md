---
title: "Stripe CTF - SQL injections (Levels 0 & 3)"
date: 2012-09-05
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p><a href="http://davescoolblog.blogspot.com/2012/08/stripe-web-security-ctf-summary.html">Stripe's web security CTF</a>'s <a href="https://stripe-ctf.com/levels/0">level 0</a> and <a href="https://stripe-ctf.com/levels/3">level 3</a> had SQL injection solutions described below.
  </p><h3>
    Level 0
  </h3><h4>
    Code
  </h4><pre><code>app.get('/*', function(req, res) {<br />  var namespace = req.param('namespace');<br /><br />  if (namespace) {<br />    var query = 'SELECT * FROM secrets WHERE key LIKE ? || ".%"';<br />    db.all(query, namespace, function(err, secrets) {</code></pre><h4>
    Issue
  </h4><p>
    There's no input validation on the namespace parameter and it is injected into the SQL query with no encoding applied. This means you can use the '%' character as the namespace which is the
    wildcard character matching all secrets.
  </p><h4>
    Notes
  </h4><p>
    Code review red flag was using strings to query the database. Additional levels made this harder to exploit by using an API with objects to construct a query rather than strings and by running a
    query that only returned a single row, only ran a single command, and didn't just dump out the results of the query to the caller.
  </p><h3>
    Level 3
  </h3><h4>
    Code
  </h4><pre><code>@app.route('/login', methods=['POST'])<br />def login():<br />    username = flask.request.form.get('username')<br />    password = flask.request.form.get('password')<br /><br />    if not username:<br />        return "Must provide username\n"<br /><br />    if not password:<br />        return "Must provide password\n"<br /><br />    conn = sqlite3.connect(os.path.join(data_dir, 'users.db'))<br />    cursor = conn.cursor()<br /><br />    query = """SELECT id, password_hash, salt FROM users<br />               WHERE username = '{0}' LIMIT 1""".format(username)<br />    cursor.execute(query)<br /><br />    res = cursor.fetchone()<br />    if not res:<br />        return "There's no such user {0}!\n".format(username)<br />    user_id, password_hash, salt = res<br /><br />    calculated_hash = hashlib.sha256(password + salt)<br />    if calculated_hash.hexdigest() != password_hash:<br />        return "That's not the password for {0}!\n".format(username)</code></pre><h4>
    Issue
  </h4><p>
    There's little input validation on username before it is used to constrcut a SQL query. There's no encoding applied when constructing the SQL query string which is used to, given a username,
    produce the hashed password and the associated salt. Accordingly one can make username a part of a SQL query command which ensures the original select returns nothing and provide a new SELECT via
    a UNION that returns some literal values for the hash and salt. For instance the following in blue is the query template and the red is the username injected SQL code:
  </p><pre><code><span style="color:blue">SELECT id, password_hash, salt FROM users WHERE username = '</span><span style="color:red">doesntexist' UNION SELECT id, ('5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8') AS password_hash, ('word') AS salt FROM users WHERE username = 'bob</span><span style="color:blue;">' LIMIT 1</span></code></pre>In the above I've supplied my own salt and hash such that my salt (word) plus my password (pass) hashed produce the hash I provided above. Accordingly, by
  providing the above long and interesting looking username and password as 'pass' I can login as any user.
  <h4>
    Notes
  </h4><p>
    Code review red flag is again using strings to query the database. Although this level was made more difficult by using an API that returns only a single row and by using the execute method which
    only runs one command. I was forced to (as a SQL noob) learn <a href="http://www.sqlite.org/lang.html">the syntax of SELECT</a> in order to figure out UNION and how to return my own literal
    values.
  </p></div></div>
