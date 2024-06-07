module.exports = {
	tags: [
		"posts"
	],
	"layout": "layouts/post.njk",
	"permalink": "/post/{{ date | dateToPath }}/{{ title | titleToPath }}/index.html",
};
