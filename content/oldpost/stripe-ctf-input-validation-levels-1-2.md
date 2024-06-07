---
title: "Stripe CTF - Input validation (Levels 1 & 2)"
date: 2012-09-06
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p><a href="http://davescoolblog.blogspot.com/2012/08/stripe-web-security-ctf-summary.html">Stripe's web security CTF</a>'s <a href="https://stripe-ctf.com/levels/1">Level 1</a> and <a href="https://stripe-ctf.com/levels/2">level 2</a> of the Stripe CTF had issues with missing input validation solutions described below.
  </p><h3>
    Level 1
  </h3><h4>
    Code
  </h4><pre><code>    &lt;?php<br />      $filename = 'secret-combination.txt';<br />      extract($_GET);<br />      if (isset($attempt)) {<br />        $combination = trim(file_get_contents($filename));<br />        if ($attempt === $combination) {</code></pre><h4>Issue</h4><p>The issue here is the usage of the <a href="http://www.php.net/manual/en/function.extract.php">extract</a> php method which extracts name value pairs from the map input parameter and creates corresponding local variables. However this code uses $_GET which contains a map of name value pairs passed in the query of the URI. The expected behavior is to get an attempt variable out, but since no input validation is done I can provide a filename variable and overwrite the value of $filename. Providing an empty string gives an empty string $combination which I can match with an empty string $attempt. So without knowing the combination I can get past the combination check.</p><h4>Notes</h4><p>Code review red flag in this case was the direct use of $_GET with no validation. Instead of using extract the developer could try to extract specifically the attempt variable manually without using extract.</p><h3>Level 2</h3><h4>Code</h4><code><pre>    $dest_dir = "uploads/";<br />    $dest = $dest_dir . basename($_FILES["dispic"]["name"]);<br />    $src = $_FILES["dispic"]["tmp_name"];<br />    if (move_uploaded_file($src, $dest)) {<br />      $_SESSION["dispic_url"] = $dest;<br />      chmod($dest, 0644);<br />      echo "<p>Successfully uploaded your display picture.</p>";<br />    }</pre></code><h4>Issue</h4><p>This code accepts POST uploads of images but with no validation to ensure it is not an arbitrary file. And even though it uses chmod to ensure the file is not executable, things like PHP don't require a file to be executable in order to run them. Accordingly, one can upload a PHP script, then navigate to that script to run it. My PHP script dumped out the contents of the file we're interested in for this level:<pre><code><?php echo file_get_contents("../password.txt"); ?></code></pre><h4>
    Notes
  </h4><p>
    Code review red flags include manual file management, chmod, and use of file and filename inputs without any kind of validation. If this code controlled the filename and ensured that the
    extension was one of a set of image extensions, this would solve this issue. Due to browser mime sniffing its additionally a good idea to serve a content-type that starts with "image/" for these
    uploads to ensure browsers treat these as images and not sniff for script or HTML.
  </p></p></div></div>
