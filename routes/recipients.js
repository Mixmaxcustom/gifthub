const db = require("../models/");


module.exports = (app) => {
    // all recipients list
    app.get("/recipients", function(req, res) {
        db.recipients.findAll().then(recipients => {
            res.json(recipients)
        })
    });

    // add a new recipient screen
    app.get("/add-recipient", function(req, res) {
        db.recipients.findAll().then(recipients => {
            res.json(recipients)
        })
    });

    // add a new recipient
    app.post("/recipients", (req, res, next) => {
        let userData = (Object.keys(req.query).length > 0) ? req.query : req.body;
        console.log(` - requesting ${req.url}`);
        // add a new recipient
        db.recipients.create(
            userData
        ).then( data => {
            res.status(200);
            res.json(data.get({ plain: true }));
        }).catch( err => {
            res.status(500);
            res.json({error: err, stackError: err.stack});
        })
    });
};
