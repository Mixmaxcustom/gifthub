const db = require("../models/");


module.exports = (app) => {
	// user profile
	app.get("/search", (req, res) => {
        console.log(` - requesting ${req.url}`);

		db.categories.findAll().then(categories => {
			app.pageContent.layout = 'main';
			app.pageContent.categories = categories;
			res.render('search', app.pageContent);
		});
	});
};
