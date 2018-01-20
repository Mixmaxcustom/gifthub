const db 	 = require('../models/');
const cookie = require('cookie');


module.exports = (app) => {
	// home page
	app.get("/", (req, res) => {
		console.log(` - requesting ${req.url}`);
		
		db.categories.findAll().then(categories => {
			app.pageContent.layout = 'main';
			app.pageContent.categories = categories;
            res.render('index', app.pageContent);
		});
	});

	// search results
	app.get("/results", (req, res) => {	
		console.log(` - requesting ${req.url}`);
		app.pageContent.pagetitle = 'Search Results';
		app.pageContent.gifts = []
		db.gifts.findAll().then( gifts => {
			gifts.forEach( gift => {
				app.pageContent.gifts.push(gift['dataValues']);
			})
			res.render('search-results', app.pageContent);
		});
	});
};
