const db = require("../models/");
const cookie = require('cookie');


let pageContent = {
	title: "gifthub",   // head title
	projname: "gifthub",
	is_logged_in: false
}

module.exports = function (app) {
	// home page
	app.get("/user/home", (req, res) => {
		console.log(` - requesting ${req.url}`);
		res.render('user/home', pageContent);
	});
};
