---
title: CSS Scroll Animated Sticky Header
description: A CSS implementation of a scroll animated sticky header
date: 2025-01-02
tags:
  - css
  - sticky
  - scroll-animation
---
I've made a sticky header that scroll animates all using CSS. I'm using the new [`position: sticky`](https://developer.mozilla.org/en-US/docs/Web/CSS/position?v=example#sticky) to make my `<header>` stick to the top of the page as the user scrolls down. Then I'm using [`animation-timeline: scroll(root)`](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations) to animate the header and its content shorter when scrolling down the page.

The big issue I ran into was a circular dependency: the header animates shorter based on the scroll position, and the header becoming shorter changes the document height and accordingly the scroll position. This resulted in strange jumping around while scrolling.

To resolve it I'm adjusting the margin-bottom of the header so that the overall height including the margin remains the same.

```
  /* default size assuming scroll animation is not supported */
  #floatyHeader {
  	top: 0px;
  	position: sticky;
  	height: 4em;
  }

  /* setup scroll animation */
	#floatyHeader {
		animation: headerChange auto linear;
		animation-timeline: scroll(root);
	}

	@keyframes headerChange {
		0% { 
			height: 300px; 
			margin-bottom: 0px; 
		}
		15% { 
			height: 4em; 
      /* set the margin-bottom to the starting size minus the end size */
			margin-bottom: calc(300px - 4em);
		}
		100% { 
			height: 4em; 
			margin-bottom: calc(300px - 4em);
		}
	}
```

Here's an <a href="/dave/examples/sticky-scroll-animted-header.html">example</a>.