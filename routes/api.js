// api routing module
const express   = require('express');
const auth   	= require('./auth');
const db        = require('../models/');


// define a router
const router = express.Router();
router.use(auth);


//  page content
router.content = {
    layout: 'api',
    projname: 'gifthub-api',
    pagetitle: '',
    favicon: process.env.PROD_FAVICON_NAME || 'favicon-dev',
    search_modal_title: 'Search Results',
    debug_mode: false,
    searchData: {
        seachCategory: null,
        results: []
    }
}


router.get('/', (req, res) => {
    let content = {
        layout: 'api',
        users: [],
        user: req.user
    }

    db.User.findAll()
        .then( users => {
            content.users = users;
            console.log(`found ${users.length} users`);
            res.render('api/index', content)
        })

        .catch(err => {
            res.json(err);
        })
});


router.get('/users', (req, res) => {
    db.User.findAll({
        include: [{
            model: db.Recipient,
                attributes: ['recipient_title', 'recipient_firstname', 'recipient_lastname',
                             'recipient_lastname', 'recipient_budget']
        }]
    })
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.json(err);
    })
});


// CLEANUP
router.get('/users/:userid', (req, res) => {
    console.log(`user id: ${req.params.userid}`);
    db.User.findOne({
        where: {
            id: req.params.userid
        },
        include: [{
            model: db.Recipient,
                attributes: ['recipient_title', 'recipient_firstname', 'recipient_lastname',
                             'recipient_lastname', 'recipient_budget']
        }]
    })

    .then( data => {
        res.json(data);
    })

    .catch( err => {
        res.json(err);
    })
});



router.get('/gifts', (req, res) => {
    db.Gift.findAll()
    .then(gifts => {
        res.json(gifts);
    })
    .catch(err => {
        res.json(err);
    })
});


router.get('/recipients', (req, res) => {
    db.Recipient.findAll()
    .then(recipients => {
        res.json(recipients);
    })
    .catch(err => {
        res.json(err);
    })
});


router.get('/events', (req, res) => {
    db.Event.findAll()
    .then(events => {
        res.json(events);
    })
    .catch(err => {
        res.json(err);
    })
});

router.get('/categories', (req, res) => {
    db.Category.findAll()
    .then(categories => {
        res.json(categories);
    })
    .catch(err => {
        res.json(err);
    })
});

// create

router.post('/users', (req, res) => {
    let data = (Object.keys(req.query).length > 0) ? req.query : req.body;
    db.User.create(
        data
    )
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        res.json(err);
    })
});



module.exports = router;
