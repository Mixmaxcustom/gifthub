const db = require("../models/");

let pageContent = {
	title: "gifthub",
	header: "API",
	projname: "gifthub-api",
	layout: 'api',
	admin: true
}

module.exports = function (app) {

    // api main page
	app.get("/api", function (req, res) {
		console.log(` - requesting ${req.url}`);

		// temporary
		pageContent.usercount = 4;
		pageContent.catcount = 12;
		pageContent.prodcount = 8;

		db.users.findAll().then( results => {
			res.render('api/index', pageContent);
		});
	});

    // api users list
	app.get("/api/users", function (req, res) {
		console.log(` - requesting ${req.url}`);
		pageContent.header = "Manage Users";
		db.users.findAll().then( results => {
			res.render('api/users', pageContent);
		});
	});

	// api gifts list
	app.get("/api/gifts", function (req, res) {
		console.log(` - requesting ${req.url}`);
		pageContent.header = "Manage Gift Items";
		db.users.findAll().then( results => {
			res.render('api/gifts', pageContent);
		});
	});

	// api categories list
	app.get("/api/categories", function (req, res) {
		console.log(` - requesting ${req.url}`);
		pageContent.header = "Manage Gift Categories";
		db.users.findAll().then( results => {
			res.render('api/categories', pageContent);
		});
	});

};
