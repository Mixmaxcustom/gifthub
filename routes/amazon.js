const db 			= require("../models/");
const path 			= require('path');
const client 		= require('../amazon-client');


module.exports = (app) => {
	app.get("/amazon", (req, res, next) => {
		console.log(` - requesting ${req.url}`);


		db.categories.findAll().then( categories => {
			app.pageContent.categories = categories;
            res.render('amazon/index', app.pageContent);
		});
	});

	app.post("/amazon", (req, res, next) => {
		console.log(` - posting ${req.url}`);
		
		// if getting values via url params, query the Request.query
		let searchData = (Object.keys(req.query).length > 0) ? req.query : req.body;

		client.itemSearch(
			searchData
		).then( results => {
			console.log(`   - getting results...`);
			app.pageContent.gifts = results;
            res.render('search', app.pageContent);
			// postman
			// res.json(results);
		}).catch( err => {
			console.log(err[0].Error[0].Message[0]);
			res.json(err);
		});
	});
};
