module.exports = {
	tags: [
		"posts"
	],
	"layout": "layouts/post.njk",
	"permalink": "/{{ date | dateToPath }}/{{ title | titleToOldPath }}/index.html",
};
