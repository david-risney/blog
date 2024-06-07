---
title: "Stripe Web Security CTF Summary"
date: 2012-08-30
---
<div xmlns="http://www.w3.org/1999/xhtml"><div><p>
    I was the <a href="https://stripe-ctf.com/leaderboard/27">546th person</a> to complete Stripe's web security CTF and again had a ton of fun applying my theoretical knowledge of web security
    issues to the (semi-)real world. As I went through the levels I thought about what red flags jumped out at me (or should have) that I could apply to future code reviews:
  </p><table><tr><th>
        Level
      </th><th>
        Issue
      </th><th>
        Code Review Red Flags
      </th></tr><tr><td>
        0
      </td><td>
        Simple SQL injection
      </td><td>
        No encoding when constructing SQL command strings. Constructing SQL command strings instead of SQL API
      </td></tr><tr><td>
        1
      </td><td>
        extract($_GET);
      </td><td>
        No input validation.
      </td></tr><tr><td>
        2
      </td><td>
        Arbitrary PHP execution
      </td><td>
        No input validation. Allow file uploads. File permissions modification.
      </td></tr><tr><td>
        3
      </td><td>
        Advanced SQL injection
      </td><td>
        Constructing SQL command strings instead of SQL API.
      </td></tr><tr><td>
        4
      </td><td>
        HTML injection, XSS and CSRF
      </td><td>
        No encoding when constructing HTML. No CSRF counter measures. Passwords stored in plain text. Password displayed on site.
      </td></tr><tr><td>
        5
      </td><td>
        Pingback server doesn't need to opt-in
      </td><td>
        n/a - By design protocol issue.
      </td></tr><tr><td>
        6
      </td><td>
        Script injection and XSS
      </td><td>
        No encoding while constructing script. Deny list (of dangerous characters). Passwords stored in plain text. Password displayed on site.
      </td></tr><tr><td>
        7
      </td><td>
        Length extension attack
      </td><td>
        Custom crypto code. Constructing SQL command string instead of SQL API.
      </td></tr><tr><td>
        8
      </td><td>
        Side channel attack
      </td><td>
        Password handling code. Timing attack mitigation too clever.
      </td></tr></table><p>
    More about each level in the future.
  </p></div></div>
