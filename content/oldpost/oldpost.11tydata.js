module.exports = {
	tags: [
		"posts"
	],
	"layout": "layouts/post.njk",
	"permalink": "/post/{{ date | dateToPath }}/{{ title | titleToOldPath }}/index.html",
};
