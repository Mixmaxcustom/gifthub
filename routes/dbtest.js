const db 	= require("../models/");



module.exports = function (app) {
	app.get("/test", (req, res, next) => {
		console.log(` - requesting ${req.url}`);
		res.render('dbtest')
	});

};
