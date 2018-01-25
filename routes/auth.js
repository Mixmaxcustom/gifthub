// user authentication module
const db        = require("../models/");
const secret    = require("../config/secret").secret;
const jwt       = require("jsonwebtoken");


// moving this here as we no longer have access to app instance
var user = {
	user_id: -1,
	user_email: null,
	user_firstname: null,
	user_lastname: null,
	user_is_logged_in: false,
	user_is_admin: false
}


// Authenticate the user with a previous cookie
function authenticate(req, res, next) {
	console.log(`- [auth]: authenticating: ${req.url}`);
	// query existing cookie
	let cookies = req.cookies;
	var nexturl = req.url;

	var token = cookies['gifthub-user'] || {};

	// add user data to request
	req.user = user;
	// if we find a value...
	if (token.length > 0) {

		// verify the cookie...
		jwt.verify(token, secret, (err, data) => {

			// failed to authenticate, redirect to login
			if (err) {
				// clear the cookie on fail
				res.clearCookie('gifthub-user');
				console.log(`- [auth]: cookie error, please login again...`);
				// res.json({ status: 402, message: err, redirect: '/login' });
				res.redirect('/login')

			// successful authentication
			} else {

				req.user.user_id = data.user_id;
				req.user.user_email = data.user_email;
				req.user.user_firstname = data.user_firstname;
				req.user.user_lastname = data.user_lastname;
				req.user.user_is_logged_in = true;
				req.user.user_is_admin = data.user_is_admin;

				console.log(`- [auth] user logged in with id: ${req.user.user_id}...`);

				// continue to the next route
				next();
			}
		});

	// no existing cookie
	} else {
		console.log(`- [auth]: no cookie found, please login...`);
		// res.json({ status: 200, message: 'no token', redirect: '/login' });
		nexturl = ( nexturl == '/register') ? 'register' : 'login';
		res.redirect(nexturl)
	}
};



module.exports = authenticate;
