const db = require("../models/");


let pageContent = {
	title: "gifthub",   // head title
	projname: "gifthub-api",   // top nav app name
	table: "categories"
}

module.exports = function (app) {
	// categories list
	app.get("/categories", function (req, res) {
		console.log(` - requesting ${req.url}`);
		app.readAuthenticationCookie(req);
		pageContent.pagetitle = "Categories";
		pageContent.content = "Browse gift categories here.";
		pageContent.is_logged_in = (app.user_data.user_id > 0);
        pageContent.user_firstname = app.user_data.user_firstname || 'none';
		db.categories.findAll().then(categories => {
			pageContent.categories = categories;
			pageContent.category_count = categories.length;
			res.render('categories', pageContent);
		})
	});

	// add new category form
	app.get("/categories/add", function (req, res) {
		console.log(` - requesting ${req.url}`);
		app.readAuthenticationCookie(req);
		pageContent.pagetitle = "Add Category";
		pageContent.content = "Add a new gift category.";
		pageContent.is_logged_in = (app.user_data.user_id > 0);
        pageContent.user_firstname = app.user_data.user_firstname || 'none';
		db.gifts.findAll().then(gifts => {
			pageContent.gifts = gifts;
			res.render('categories/add', pageContent);
		})
	});

	// add a new category
	app.post("/categories", function (req, res) {
		console.log(` - posting ${req.url}`);
		app.readAuthenticationCookie(req);
		let categoryData = req.body;
		db.categories.create(categoryData,
		).then(function(data) {
			// redirect when finished
			res.json({status: "Success", redirect: '/categories'});
		});
	});

	// get category detail
	app.get("/categories/:category_id", function (req, res) {
		let category_id = req.params.category_id;
		app.readAuthenticationCookie(req);

		pageContent.pagetitle = "Edit Category";
		pageContent.content = "Change category details";

		db.categories.findOne({
            where: {
                category_id: category_id
              }
        }).then( category => {
            if (category) {
				pageContent.category = category;
				res.render('categories/edit', pageContent);
            }
        });
	});

	// category edited
	app.put("/categories/:category_id", function (req, res) {
		console.log(` - putting ${req.url}`);
		app.readAuthenticationCookie(req);
		let categoryData = req.body;

		db.categories.update({
			category_name: req.body.category_name,
			category_description: req.body.category_description
		}, {
			where: {
				category_id: req.params.category_id
			}
		  }).then(category => {
				res.json({status: "Success", redirect: '/categories'});
		  });
	});

	// delete category
	app.delete("/categories/:category_id", function (req, res) {
		// in the event of multiple ids passed, split them
		let category_id = req.params.category_id.split(',');
		db.categories.destroy({
			where: { category_id: category_id}}
		).then( category => {
			res.json({status: "Success", redirect: '/categories'});
		});
	});
};
