const db 	= require("../models/");
const path 	= require('path');


module.exports = function (app) {
	app.get("/amazon", (req, res, next) => {
		console.log(` - requesting ${req.url}`);
		res.sendFile(path.join(__dirname, '/../public/amazon-api-search.html'));
	});

    app.post("/amazon", (req, res, next) => {
        console.log(` - requesting ${req.url}`);
		let searchData = req.body;
		console.log(searchData);
    });
};
