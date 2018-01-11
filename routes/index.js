const db = require("../models/");
const cookie = require('cookie');


let pageContent = {
	title: "gifthub",   // head title
	projname: "gifthub",
	is_logged_in: false   // top nav app name
}

module.exports = function (app) {
	// home page
	app.get("/", function (req, res) {
		console.log(` - requesting ${req.url}`);

		app.checkUserAuthentication(req);

		pageContent.pagetitle = "Welcome to gifthub!";
		pageContent.content = "We're still setting up, please be patient.";

		if (app.user_data.user_email != null) {
			pageContent.pagetitle = `Welcome, ${app.user_data.user_firstname}`;
			pageContent.is_logged_in = (app.user_data.user_id > 0);
			pageContent.user_firstname = app.user_data.user_firstname || 'none';

			res.render("index", pageContent);
		} else {
			pageContent.is_logged_in = false;
			pageContent.pagetitle = "Login";
			pageContent.content = "Please sign into your account";
			res.render("login", pageContent);
		}
	});
};
