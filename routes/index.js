const db 	 = require('../models/');
const cookie = require('cookie');


module.exports = function (app) {
	// home page
	app.get("/", (req, res) => {
		console.log(` - requesting ${req.url}`);
		
		db.categories.findAll().then(categories => {
			app.pageContent.categories = categories;
			console.log(JSON.stringify(app.pageContent, null, 4));
            res.render('index', app.pageContent);
		});
	});

	// search results
	app.get("/results", (req, res) => {	
		console.log(` - requesting ${req.url}`);
		app.pageContent.pagetitle = 'Search Results';
		db.gifts.findAll().then(gifts => {

			gifts.forEach( gift => {
				console.log(gift);
			})

			app.pageContent.results = gifts.dataValues;
			// console.log(gifts);
			
			res.render('search-results', app.pageContent);
			// res.json(gifts)
		});
	});
};
