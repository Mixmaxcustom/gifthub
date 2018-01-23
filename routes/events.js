const db = require("../models/");


module.exports = (app) => {
    // all recipients list
    app.get("/events", function(req, res) {
        // look for the current user in the database
        db.events.findAll().then( events => {
            // res.json(events)
            app.content.events = events;
            app.content.pagetitle = 'Events'
            res.render('events', app.content)
        })
    });

    // add a new event screen
    app.get("/add-event", function(req, res) {
        // look for the current user in the database

        db.users.findOne({
            where: {
                user_id: app.content.user.user_id
            }
        })

        db.events.findAll().then( events => {
            res.json(events)
        })
    });

    // add a new recipient
    app.post("/events", (req, res, next) => {
        let eventData = (Object.keys(req.query).length > 0) ? req.query : req.body;

        console.log(` - requesting ${req.url}`);
        console.log(eventData);
        // look for the current user in the database
        db.events.create(
            eventData
        ).then( data => {
            //console.log( recipient.get({plain: true }))
            res.status(200);
            res.json(data.get({ plain: true }));
        }).catch( err => {
            res.status(500);
            res.json({error:error, stackError:error.stack});
        })
    });
};