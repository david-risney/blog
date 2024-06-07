[cmdletbinding()]
param($feedPath,
    $postPath,
    [switch] $whatif);

$feedXml = [xml](Get-Content $feedPath);
$feedXml.feed.entry | ?{ $_.id.Contains("coolblog"); } | %{
    $filename = $_.id.split("/")[-1].replace(".html", ".md");
    $filename = "old-blog-" + $filename;
    $filepath = Join-Path $postPath $filename;

    $date = [datetime]::Parse($_.updated).Date.ToString("yyyy-MM-dd");
    $content = $_.content.innerXML;
    $title = $_.title.'#text';

    $fileContent = "---`n" +
        "title: `"$($title)`"`n" + 
        "date: $($date)`n" +
        "---`n" +
        $content;
        
    if ($whatif) {
        Write-Verbose "Writing to $filepath";
        Write-Verbose $fileContent;
    } else {
        Write-Verbose "Writing to $filepath";
        $fileContent > $filepath;
    }
}