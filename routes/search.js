const db = require("../models/");


module.exports = (app) => {

	// search page
	app.get("/search", (req, res) => {
        console.log(` - requesting ${req.url}`);

		db.Category.findAll().then(categories => {
			app.content.layout = 'main';
			app.content.categories = categories;
			res.render('search', app.content);
		});
	});

	// search results
	app.get("/results", (req, res) => {
		console.log(` - requesting ${req.url}`);

		db.Category.findAll().then(categories => {
			app.content.layout = 'main';
			app.content.categories = categories;
			res.render('search', app.content);
		});
	});
};
