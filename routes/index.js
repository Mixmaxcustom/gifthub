const db = require("../models/");


let pageContent = {
	title: "gifthub",   // head title
	projname: "gifthub",   // top nav app name
}

module.exports = function (app) {
	// home page
	app.get("/", function (req, res) {
		console.log(` - requesting ${req.url}`);
		pageContent.pagetitle = "Welcome to gifthub!";
		pageContent.content = "We're still setting up, please be patient.";
		res.render("index", pageContent);
	});
};
