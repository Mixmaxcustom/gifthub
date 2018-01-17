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
		pageContent.pagetitle = "Login";
        pageContent.content = "Please sign into your account";
        pageContent.is_logged_in = (app.user_data.user_id > 0);
        pageContent.user_firstname = app.user_data.user_firstname || 'none';

		db.users.findAll().then(users => {
            pageContent.users = users;
            res.render('login', pageContent);
		});
	});

	// user login
	app.post("/login", function (req, res) {
        // get user credentials from request
        let user_email = req.body.user_email;
        let user_password = req.body.user_password;
        db.users.findOne({
                where: {
                    user_email: user_email
                  }
            }).then( user => {
                if (user) {
                    // compare passwords
                    if (user_password == user.user_password) {
                        app.user_data.user_id = user.user_id;
                        app.user_data.user_firstname = user.user_firstname;
                        // send the user data back to the view
                        // res.json(user);

                        // set a cookie
                        res.cookie("gifthub-user", JSON.stringify(user))

                        // redirect when finished
                        pageContent.is_logged_in = true;
                        res.json({user: user, status: "Success", redirect: '/'});
                    // incorrect password
                    } else {
                        // res.status(401).json(
                        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                    }
                // user not in database
                } else {
                    // res.status(401).json({ error: 'user does not exist'});
                    res.json({ success: false, message: 'Authentication failed. User not found.' });
                }

        });
    });

    // clear cookie
	app.get("/logout", function (req, res) {
        app.user_data.user_id = -1;
        app.user_data.user_firstname = null;
        pageContent.is_logged_in = false;
        pageContent.pagetitle = "Login";
        pageContent.content = "Please sign into your account";
        res.clearCookie('jwttoken').render('login', pageContent);
    });
    
    // user registration
	app.get("/register", function (req, res) {
		pageContent.pagetitle = "Register";
        pageContent.content = "Create an account here.";
        pageContent.is_logged_in = (app.user_data.user_id > 0);
        pageContent.user_firstname = app.user_data.user_firstname || 'none';
        res.render('register', pageContent);
	});
};

