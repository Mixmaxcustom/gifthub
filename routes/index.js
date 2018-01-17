const db = require("../models/");
const cookie = require('cookie');


let pageContent = {
	title: "gifthub",   // head title
	projname: "gifthub",
	is_logged_in: false   // top nav app name
}

module.exports = function (app) {
	// home page
	app.get("/", (req, res) => {
		console.log(` - requesting ${req.url}`);

		db.categories.findAll().then(categories => {
            pageContent.categories = categories;
            res.render('index', pageContent);
		});
	});
};
