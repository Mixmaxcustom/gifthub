const db = require("../models/");


let pageContent = {
	title: "gifthub",   // head title
	projname: "gifthub",   // top nav app name
}

module.exports = function (app) {
	// user profile
	app.get("/profile", (req, res) => {
        console.log(` - requesting ${req.url}`);
		res.render('profile', pageContent);
    });
};
