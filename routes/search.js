const db = require("../models/");


module.exports = (app) => {

	// search page
	app.get("/search", (req, res) => {
        console.log(` - requesting ${req.url}`);

		db.Categories.findAll().then(categories => {
			app.pageContent.layout = 'main';
			app.pageContent.categories = categories;
			res.render('search', app.pageContent);
		});
	});

	// search results
	app.get("/results", (req, res) => {
		console.log(` - requesting ${req.url}`);

		db.Categories.findAll().then(categories => {
			app.pageContent.layout = 'main';
			app.pageContent.categories = categories;
			res.render('search', app.pageContent);
		});
	});
};
