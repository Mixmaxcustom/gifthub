const db = require('../models/');
// const userAuth = require('./authtest');
const cookie = require('cookie');


let pageContent = {
	title: "gifthub",   // head title
	projname: "gifthub",
	is_logged_in: false   // top nav app name
}


module.exports = function (app) {
	// home page
	// app.get("/", userAuth, (req, res) => {
	app.get("/", (req, res) => {	
		console.log(` - requesting ${req.url}`);

		db.categories.findAll().then(categories => {
            pageContent.categories = categories;
            res.render('index', pageContent);
		});
	});

	app.get("/results", (req, res) => {	
		console.log(` - requesting ${req.url}`);
		pageContent.pagetitle = 'Search Results';
		db.gifts.findAll().then(gifts => {
            pageContent.results = gifts;
			res.render('search-results', pageContent);
			// res.json(gifts)
		});
	});
};
