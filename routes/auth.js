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

        if (token.length > 0) {
            jwt.verify(token, secret, (err, data) => {

                if (err) {
                    // clear the cookie on fail
                    res.clearCookie('gifthub-user');
                    res.json({ status: 402, message: err, redirect: '/login' });

                } else {
                    // successful authentication
                    app.pageContent.user = data;
                    app.pageContent.user.is_logged_in = true;
                    next();
                }
            });

        // no existing cookie
        } else {
            // res.json({ status: 403, message: 'not authenticated.', redirect: req.originalUrl });
            next();
        }
        // next();
    });

};
