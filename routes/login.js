const db 		= require("../models/");
const auth 		= require("../config/auth");
const cookie 	= require('cookie');
const jwt 		= require("jsonwebtoken");
const secret 	= require("../config/secret").secret;


module.exports = (app) => {

	// user login
	app.get("/login", function (req, res) {
		if (app.pageContent.user.is_logged_in == true) {
			//app.pageContent.layout = 'main';
			//res.render('index', app.pageContent);
			//return;
		}
		app.pageContent.layout = 'home';
		res.render('login', app.pageContent);
	});

    // user logged out
	app.get("/logout", function (req, res) {
        // reset the page content user
        app.pageContent.user = {
            user_id: -1,
            user_email: null,
            user_firstname: null,
            user_lastname: null,
            is_logged_in: false
        }

        // clear the cookie
        app.pageContent.layout = 'home';
        res.clearCookie('gifthub-user').render('login', app.pageContent);
    });

    // user registration
	app.get("/register", function (req, res, next) {
		if (app.pageContent.user.is_logged_in == true) {
			//app.pageContent.layout = 'main';
			//res.render('index', app.pageContent);
			//return;
		}
		app.pageContent.layout = 'home';
        res.render('register', app.pageContent);
	});

    // check user credentials
    app.post("/login", (req, res, next) => {
        let userData = req.body;

        // TODO: sanity check user

        // look for the current user in the database
        db.users.findOne({
            where: {
                user_email: userData.user_email
              }
        }).then( user => {

            // user match in database
            if (user) {
                // user logged in successfully
                if (user.user_password === userData.user_password) {

                    let dbuser = {
                        user_firstname: user.user_firstname,
                        user_lastname: user.user_lastname,
                        user_email: user.user_email,
                        user_id: user.user_id,
                        user_is_admin: user.user_is_admin
                    }

                    // sign and create cookie
                    const token = jwt.sign(dbuser, secret);
                    // res.cookie('gifthub-user', token, { maxAge: 86400 });
                    res.cookie('gifthub-user', token);
                    res.json({ status: 100, redirect: '/' });

                // user is in database, but passwords don't match
                } else {
                    res.json({ status: 403, message: 'incorrect password.', redirect: '/login' });
                }

            // email not found in the database
            } else {
                // res.status(500).json({ error: 'message', redirect: '/login' });
                res.json({ status: 401, message: 'user not in database.', redirect: '/login' });
            }
        });
    });
};
