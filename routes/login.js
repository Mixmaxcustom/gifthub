const db 		= require("../models/");
const cookie 	= require('cookie');
const jwt 		= require("jsonwebtoken");
const secret 	= require("../config/secret").secret;


module.exports = (app) => {

	// user login
	app.get("/login", function (req, res) {
		app.content.layout = 'home';
		res.render('login', app.content);
	});

    // check user credentials
    app.post("/login", (req, res, next) => {
        let userData = req.body;

        // TODO: sanity check user

        // look for the current user in the database
        db.User.findOne({
            where: {
                user_email: userData.user_email
              }
        })

		.then( user => {
            // user match in database
            if (user) {
                // user logged in successfully
                if (user.user_password === userData.user_password) {

                    let dbuser = {
                        user_firstname: user.user_firstname,
                        user_lastname: user.user_lastname,
                        user_email: user.user_email,
                        user_id: user.UserId,
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
        })

		.catch(err => {
            res.json(err);
        });
    });

	// user logged out
	app.get("/logout", function (req, res) {
		// reset the page content user
		app.content.user = {
			user_id: -1,
			user_email: null,
			user_firstname: null,
			user_lastname: null,
			user_is_logged_in: false,
			user_is_admin: false
		}

		// clear the cookie
		app.content.layout = 'home';
		res.clearCookie('gifthub-user').render('login', app.content);
    });

    // user registration
	app.get("/register", function (req, res, next) {
        res.render('register', app.content);
    });

	// check user credentials
	app.post("/register", (req, res, next) => {
		let userData = (Object.keys(req.query).length > 0) ? req.query : req.body;
        console.log(` - requesting ${req.url}`);

        // add a new recipient
        // TODO: need to check that user email isn't registered already
        db.User.create(
            userData
        )

		.then( data => {
            res.status(200);
			res.json({ status: 200, redirect: '/' });
            // res.json(data.get({ plain: true }));
        })

		.catch( err => {
            res.status(500);
            res.json({error: err, stackError: err.stack});
        })
	});


};
