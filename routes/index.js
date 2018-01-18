const db = require('../models/');
const cookie = require('cookie');



module.exports = function (app) {
	// home page
	app.get("/", (req, res) => {
		console.log(` - requesting ${req.url}`);
		console.log(app.user);
		
		db.categories.findAll().then(categories => {
			app.pageContent.categories = categories;
            res.render('index', app.pageContent);
		});
	});

	app.get("/results", (req, res) => {	
		console.log(` - requesting ${req.url}`);
		app.pageContent.pagetitle = 'Search Results';
		db.gifts.findAll().then(gifts => {
            app.pageContent.results = gifts;
			res.render('search-results', app.pageContent);
			// res.json(gifts)
		});
	});
};
