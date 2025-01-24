module.exports = {
	tags: [
		"posts"
	],
	"layout": "layouts/post.njk",
	"permalink": "/dave/{{ date | dateToPath }}/{{ title | titleToPath }}/index.html",
};
