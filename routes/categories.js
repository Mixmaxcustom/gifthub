const db = require("../models/");


let pageContent = {
	title: "gifthub",   // head title
	projname: "gifthub",   // top nav app name
	table: "categories"
}

module.exports = function (app) {
	// categories list
	app.get("/categories", function (req, res) {
		console.log(` - requesting ${req.url}`);
		pageContent.pagetitle = "Categories";
		pageContent.content = "Browse gift categories here.";
		db.categories.findAll().then(categories => {
			pageContent.categories = categories;
			res.render('categories', pageContent);
		})
	});

	// add new category
	app.get("/categories/add", function (req, res) {
		console.log(` - requesting ${req.url}`);
		pageContent.pagetitle = "Add Category";
		pageContent.content = "Add a new gift category.";
		db.gifts.findAll().then(gifts => {
			pageContent.gifts = gifts;
			res.render('categories/add', pageContent);
		})
	});

	// add a new category
	app.post("/categories", function (req, res) {
		console.log(` - posting ${req.url}`);
		let categoryData = req.body;
		db.categories.create(categoryData, 
		).then(function(data) {
			// redirect when finished
			res.json({status: "Success", redirect: '/categories'});
		});
	});
};
