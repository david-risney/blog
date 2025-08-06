---
title: Code Search Comparison: GitHub, Azure DevOps, and Chromium
description: A comparison of code search capabilities between GitHub, Azure DevOps, and Chromium Code Search.
date: 2025-08-06
tags:
  - code-search
  - chromium
  - azure-devops
  - ado
  - github
  - regex
---

Before working in Chromium I had been using our internal project's Azure DevOps (ADO) code search feature, and occassionally using Chromium Code Search or GitHub's code search. It seemed like Chromium Code Search or GitHub code search would only sometimes work with my queries. Sitting down to compare the syntax of them led me to figure out why and the power of Chromium Code Search:

## Comparison Table

| Feature | ADO        | Chromium | GitHub |
|---------|------------|----------|--------|
| Wildcard syntax | Full glob match (`*`) | Partial regex match (uses regular expressions, e.g. `.*`) | Paths use partial glob, everything else is partial literal match, or partial regex with slashes |
| Search for method/class definition/declaration | `Def:Name` / `decl:Name` | `Class:Name` / `Func:Name` | `Symbol:Name` |
| Negation logic operator | `NOT` | `-` | `NOT` |
| Includes generated files | ❌ | ✅ | ❌ |
| Documentation | [Functional code search - Azure Repos \| Microsoft Learn](https://learn.microsoft.com/en-us/azure/devops/repos/git/code-search?view=azure-devops) | [Syntax reference \| Code Search \| Google for Developers](https://developers.google.com/code-search/reference/syntax) | [Understanding GitHub Code Search syntax](https://docs.github.com/en/search-github/github-code-search/understanding-github-code-search-syntax) |

The biggest difference is learning that Chromium is using partial regular expressions matching, ADO is using full glob matching, and GitHub is using partial literal matching unless you use `/.../` to explicitly ask for regular expressions. So **TLDR**: `*` in ADO should be `.*` in Chromium, and `/.*/` in GitHub.

### Example Comparison

**ADO query:**
```
kTopLevel NOT path:*test* NOT ext:mojom path:*service*
```

**[cs.chromium query](https://source.chromium.org/search?q=%5CbkTopLevel%5Cb%20-path:test%20-path:%5C.mojom$%20-path:%5Eout%2F%20path:service&sq=&ss=chromium):**
```
\bkTopLevel\b -path:test -path:\.mojom$ -path:^out/ path:service
```

**[GitHub query](https://github.com/search?q=repo%3Achromium%2Fchromium+%2F%5CbkTopLevel%5Cb%2F+NOT+path%3Atest+NOT+path%3A*.mojom+PATH%3Aservice&type=code):**
```
repo:chromium/chromium /\bkTopLevel\b/ NOT path:test NOT path:*.mojom PATH:service
```

### Notable Differences:

#### `kTopLevel`
- **ADO**: `kTopLevel` matches just that word unless you use `*` to match more.
- **cs.chromium**: `kTopLevel` is a regular expression that matches parts of words and you need to use `\b` on the ends to indicate that it shouldn't match more.
- **GitHub**: `kTopLevel` on its own does a partial literal match. If you want to match the whole word you can use a regular expression with `/.../` around it, so `/\bkTopLevel\b/`.

#### `NOT path:*test*`
- **ADO**: We use `NOT` for negation and to match any path with test we again have to use `*` to match more
- **cs.chromium**: We negate with `–` and test is a regular expression that matches the text test anywhere in the path.
- **GitHub**: We negate with `NOT` and test is a partial glob matches the text test anywhere in the path.

#### `NOT ext:mojom`
- **ADO**: We can use `ext:` to match file extensions. It's just a shortcut for saying `path:*.mojom`.
- **cs.chromium**: We need to represent this as a regular expression `-path:\.mojom$`. In this case escape the `.` with `\` so it's a literal `.` and use `$` to indicate that this is the end of the path.
- **GitHub**: We can use `path:*.mojom` to match the file extension, although its a partial glob match so it would also match something like `my.mojom.txt` and is not perfect.

#### `-path:^out/`
- **cs.chromium**: They index generated files. Depending on what you're looking for this can be incredibly useful or since it indexes multiple different archs and platforms of generated code it can produce a lot of noise. You can use `-path:^out/` to ensure no generated files under the gen build folder show up.
