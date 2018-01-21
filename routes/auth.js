// user authentication module
const db        = require("../models/");
const secret    = require("../config/secret").secret;
const auth      = require("../config/auth");
const cookie    = require('cookie');
const jwt       = require("jsonwebtoken");



module.exports = (app) => {

	app.get("*", (req, res, next) => {
        // query existing cookie
        let cookies = req.cookies;
        var token = cookies['gifthub-user'] || {};


        // if we find a value...
        if (token.length > 0) {

            // verify the cookie...
            jwt.verify(token, secret, (err, data) => {

                // failed to authenticate, redirect to login
                if (err) {
                    // clear the cookie on fail
                    res.clearCookie('gifthub-user');
                    res.json({ status: 402, message: err, redirect: '/login' });

				// successful authentication
                } else {

                    app.pageContent.user = data;
                    app.pageContent.user.is_logged_in = true;

                    // continue to the next step
                    next();
                }
            });

        // no existing cookie
        } else {
			// res.json({ status: 200, message: 'no token', redirect: '/login' });
			let nonUserURL = ( req.url == '/register') ? 'register' : 'login';
			res.render(nonUserURL, {layout: 'home'})
        }
    });
};
