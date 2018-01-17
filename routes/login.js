const db = require("../models/");
const auth = require("../config/auth");
const cookie = require('cookie');


// var setCookie = cookie.serialize('foo', 'bar');

let pageContent = {
	title: "gifthub", // head title
	projname: "gifthub", // top nav app name
	table: "users",
    admin: false,
    is_logged_in: false
}

module.exports = function (app) {
	// user login
	app.get("/login", function (req, res) {
		res.render('login', pageContent);
	});

    // user logged out
	app.get("/logout", function (req, res) {
        // res.clearCookie('jwttoken').render('login', pageContent);
        res.render('register', pageContent);
    });
    
    // user registration
	app.get("/register", function (req, res) {
        res.render('register', pageContent);
	});
};

