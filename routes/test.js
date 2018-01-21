const db = require("../models/");


module.exports = (app) => {
	// user profile
	app.get("/test", (req, res) => {
        console.log(` - requesting ${req.url}`);
        res.render('test/index');
	});
};
