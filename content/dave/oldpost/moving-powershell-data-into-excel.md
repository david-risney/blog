---
title: "Moving PowerShell data into Excel"
date: 2013-08-15
---
<div xmlns="http://www.w3.org/1999/xhtml"><div>
  PowerShell nicely includes ConvertTo-CSV and ConvertFrom-CSV which allow you to serialize and deserialize your PowerShell objects to and from CSV. Unfortunately the CSV produced by ConvertTo-CSV is
  not easily opened by Excel which expects by default different sets of delimiters and such. Looking online you'll find folks who recommend using automation via COM to create a new Excel instance and
  copy over the data in that fashion. This turns out to be very slow and impractical if you have large sets of data. However you can use automation to open CSV files with not the default set of
  delimiters. So the following isn't the best but it gets Excel to open a CSV file produced via ConvertTo-CSV and is faster than the other options:
  <pre><code>Param([Parameter(Mandatory=$true)][string]$Path);<br /><br />$excel = New-Object -ComObject Excel.Application<br /><br />$xlWindows=2<br />$xlDelimited=1 # 1 = delimited, 2 = fixed width<br />$xlTextQualifierDoubleQuote=1 # 1= doublt quote, -4142 = no delim, 2 = single quote<br />$consequitiveDelim = $False;<br />$tabDelim = $False;<br />$semicolonDelim = $False;<br />$commaDelim = $True;<br />$StartRow=1<br />$Semicolon=$True<br /><br />$excel.visible=$true<br />$excel.workbooks.OpenText($Path,$xlWindows,$StartRow,$xlDelimited,$xlTextQualifierDoubleQuote,$consequitiveDelim,$tabDelim,$semicolonDelim, $commaDelim);</code></pre>See
  <a href="http://msdn.microsoft.com/en-us/library/ff837097.aspx">Workbooks.OpenText documentation</a> for more information.
</div></div>
