const db 	= require("../models/");
const path 	= require('path');


module.exports = function (app) {
	app.get("/amazon", (req, res, next) => {
		console.log(` - requesting ${req.url}`);
		res.render('amazon/index');
	});

    app.post("/amazon", (req, res, next) => {
        console.log(` - posting ${req.url}`);
		let searchData = req.body;
		console.log(searchData);
    });
};
