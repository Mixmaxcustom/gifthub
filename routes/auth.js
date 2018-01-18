// user authentication module
const db = require("../models/");
const secret = require("../config/secret").secret;
const auth = require("../config/auth");
const cookie = require('cookie');
const jwt = require("jsonwebtoken");



module.exports = (app) => {

	app.get("*", (req, res, next) => {
        app.pageContent = { layout: 'main', projname: null, user: { user_id: -1, user_email: null, user_firstname: null, is_logged_in: false}};
        let cookies = req.cookies;

        var token = cookies['gifthub-user'] || {};

        if (token.length > 0) {
            jwt.verify(token, secret, (err, data) => {
                if (err) {
                    //this is never hit due to controls in the jsonwebtoken package
                    // res.redirect('/login')
                    res.json({ status: 402, message: err, redirect: '/login' });
                } else {
                    //successful authentication
                    // console.log(`   - user ${data.user_firstname} authenticated!`);
                    app.pageContent.user = data;
                    app.pageContent.user.is_logged_in = true;
                    next();
                }
            });
        } else {
            // res.json({ status: 403, message: 'not authenticated.', redirect: req.originalUrl });
            next();
        }
        // next();
    });

};
