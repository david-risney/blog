module.exports = {
	tags: [
		"posts"
	],
	"layout": "layouts/post.njk",
	"permalink": "/dave/{{ date | dateToPath }}/{{ title | titleToOldPath }}/index.html",
};
