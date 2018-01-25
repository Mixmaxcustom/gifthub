const express 	    = require("express");
const auth   	    = require('./auth');
const db 		    = require('../models');
const jwt 		    = require("jsonwebtoken");
const secret 	    = require("../config/secret").secret;
const path 			= require('path');
const client 		= require('../config/amazon');
const amazon 		= require('amazon-product-api');


// create a router
const router = express.Router();

//  page content
router.content = {
    layout: 'main',
    projname: 'gifthub',
    pagetitle: '',
    favicon: process.env.PROD_FAVICON_NAME || 'favicon-dev',
    search_modal_title: 'Search Results',
    debug_mode: false,
    user: {},
    searchData: {
        seachCategory: null,
        results: []
    }
}


function updateContent(req, res, next) {
    let nexturl = req.url;
    this.content = {
        layout: 'main',
        projname: 'gifthub',
        pagetitle: '',
        favicon: process.env.PROD_FAVICON_NAME || 'favicon-dev',
        search_modal_title: 'Search Results',
        debug_mode: false,
        user: {},
        searchData: {
            seachCategory: null,
            results: []
        }
    }

    if (['/login', '/register'].includes()) {
        this.content.layout = 'home';
    }

    if (req.user) {
        this.user = req.user;
        console.log(`- [router]: user:  "${this.user}"`);
    }


    console.log(`- [router]: using layout "${this.content.layout}"`);
    next();
}


router.use(updateContent);


// Amazon product object
var ProductCard = function(asin, title, image, thumbnail, price, detailsURL, description, category) {
    this.gift_id = 0,
    this.asin = asin,
    this.title = title,
    this.image = image,
    this.thumbnail = thumbnail,
    this.price = parseInt(price),
    this.detailsURL = detailsURL,
	this.description = description,
    this.category = category
}


// recipient constructor
function Recipient(id, title, firstname, lastname, budget, bio, photo, birthday ) {
    this.id = id,
    this.firstname = firstname,
    this.lastname = lastname,
    this.title = title,
    this.bio = bio,
    this.photo = photo,
    this.birthday = birthday,
    this.budget = budget,
    this.gifts = []
};


Recipient.prototype.name = function() {
    var result = this.title;
    if (this.firstname) {
        result = this.firstname

        if (this.lastname) {
            result += ` ${this.lastname}`
        }
    }
    return result;
};


Recipient.prototype.currentTotal = function() {
    var total = 0;
    this.gifts.forEach( gift => {
        total += gift.gift_price;
    })
    return total / 100;
};



var currentSearchResults = [];
var userRecipients = [];


// ROUTES

router.get("/", auth, (req, res) => {
	console.log(` - requesting ${req.url}`);

	db.Category.findAll().then(categories => {
		router.content.layout = 'main';
		router.content.categories = categories;
        router.content.user = req.user;
        res.render('index', router.content);
	});
});


// page not found
router.get("/404", (req, res) => {
    router.content.layout = 'home';
    res.render('404', router.content);
});


// user login
router.get("/login", (req, res) => {
	router.content.layout = 'home';
	res.render('login', router.content);
});


// check user credentials
router.post("/login", (req, res) => {

    // request contains user_email, user_password
	let userData = req.body;
    console.log(`- [index]: logging in: ${userData.user_email}`);

	// look for the current user in the database
	db.User.findOne({
		where: {
			user_email: userData.user_email
		  }
	})

	.then( user => {

		// user match in database
		if (user) {

            console.log(`- [index]: user data found for:  ${userData.user_email}`);
			// user logged in successfully
			if (user.user_password === userData.user_password) {

                console.log(`- [index]: login successful!`);

				let dbuser = {
					user_firstname: user.user_firstname,
					user_lastname: user.user_lastname,
					user_email: user.user_email,
					user_id: user.id,
					user_is_admin: user.user_is_admin
				}

				// sign and create cookie
                router.content.layout = 'main';
				const token = jwt.sign(dbuser, secret);
				// res.cookie('gifthub-user', token, { maxAge: 86400 });
				res.cookie('gifthub-user', token);
                res.json({token: token});


			// user is in database, but passwords don't match
			} else {
                console.log(`- [index]: incorrect password`);
				res.json({ status: 403, message: 'incorrect password.', redirect: '/login' });
			}

		// email not found in the database
		} else {
            console.log(`- [index]: user not in database, please register...`);
			// res.status(500).json({ error: 'message', redirect: '/login' });
			res.json({ status: 401, message: 'user not in database.', redirect: '/register' });
		}
	})

	.catch(err => {
		res.json(err);
	});
});



// user logged out
router.get("/logout", function (req, res) {
	// reset the page content user
	router.content.user = {
		user_id: -1,
		user_email: null,
		user_firstname: null,
		user_lastname: null,
		user_is_logged_in: false,
		user_is_admin: false
	}

	// clear the cookie
	router.content.layout = 'home';
    router.content.user = {};
	res.clearCookie('gifthub-user').render('login', router.content);
});


// user registration
router.get("/register", function (req, res, next) {
    router.content.layout = 'home';
	res.render('register', router.content);
});


// check user credentials
router.post("/register", (req, res, next) => {

	let userData = (Object.keys(req.query).length > 0) ? req.query : req.body;
	console.log(` - requesting ${req.url}`);

	// add a new recipient
	// TODO: need to check that user email isn't registered already
	db.User.create(
		userData
	)

	.then( data => {
        console.log(`- [index]: creating user...`);
        let dbuser = {
            user_firstname: data.user_firstname,
            user_lastname: data.user_lastname,
            user_email: data.user_email,
            user_id: data.id,
            user_is_admin: data.user_is_admin
        }

        // sign and create cookie
        const token = jwt.sign(dbuser, secret);
        // res.cookie('gifthub-user', token, { maxAge: 86400 });
        res.cookie('gifthub-user', token);
        res.json({token: token});

		//res.status(200);
		//res.json({ status: 200, redirect: '/' });
	})

	.catch( err => {
		res.status(500);
		res.json({error: err, stackError: err.stack});
	})
});


// user profile
router.get("/profile", auth, (req, res) => {
    console.log(` - requesting ${req.url}`);
    console.log(` - [debug]: user check: ${JSON.stringify(req.user)}`);
    router.content.user = req.user;

    console.log(`- [profile]: searching for user id: ${req.user.user_id}`);
    console.log(`- [profile]: user is logged in: ${req.user.user_is_logged_in}`);

    userRecipients = [];
    db.User.findOne({
        where: {
                id: req.user.user_id
            },
            include: [{
                model: db.Recipient,
                attributes: ['id', 'recipient_title', 'recipient_firstname', 'recipient_lastname', 'recipient_bio',
                            'recipient_photo', 'recipient_birthday', 'recipient_budget', 'recipient_city', 'recipient_state'],
                include: [{
                    model: db.Gift,
                    attributes: ['id', 'gift_name', 'gift_description', 'gift_asin', 'gift_part_num', 'gift_url', 'gift_photo', 'gift_price', 'gift_purchased', 'gift_favorite']
                }]
            }]
        })

        .then( user => {

            let thisUser = user.dataValues;
            let recipients = thisUser.Recipients;  /* array */

            recipients.forEach(recipient => {

                let rdata = recipient.dataValues;
                // fixed recipient id value here - Michael
                let robj = new Recipient(rdata.id, rdata.recipient_title, rdata.recipient_firstname, rdata.recipient_lastname,
                                         rdata.recipient_budget, rdata.recipient_bio, rdata.recipient_photo, rdata.recipient_birthday)


                rdata.Gifts.forEach( gift => {
                    // console.log(gift.dataValues);
                    robj.gifts.push (gift.dataValues)
                })
                userRecipients.push(robj);
            })

            router.content.layout = 'main';
            console.log(`\n -> adding ${userRecipients.length}`);
            console.log(userRecipients);
            router.content.recipients = userRecipients;

            // render the page
            res.render('profile', router.content);
        })

        .catch(err => {
            res.json({message: err});
        })
});

// AMAZON

router.post("/amazon", (req, res, next) => {
    console.log(` - posting ${req.url}`);


    currentSearchResults = [];

    // if getting values via url params, query the Request.query
    let isPostman = (Object.keys(req.query).length > 0) ? true : false;
    let searchData = (isPostman === true) ? req.query : req.body;
    let sortBy = (searchData.SearchIndex === 'All') ? null : 'salesrank';

    client.itemSearch({
        SearchIndex: searchData.SearchIndex,
        Keywords: searchData.Keywords,
        MaximumPrice: searchData.MaximumPrice,
        // Hard coded a minimum price so the price result wouldn't error out.
        MinimumPrice: "0500",
        ResponseGroup: 'ItemAttributes,Offers,Images'

    }).then( results => {
        // send results via json if using postman
        if (isPostman === true) {
            res.json(results);
        } else {
            // empty array to capture productCards
            let productCardArr = [];

            // This loops through the specific results i pulled out of the JSON object from the API
            results.forEach((result, i) => {

                let itemAttributes = results[i].ItemAttributes[0];

                // Assign desired product info to variables -JR
                let productAsin = results[i].ASIN[0];
                console.log(` -->> AISN: ${productAsin}`);
                let productTitle = results[i].ItemAttributes[0].Title[0];
                let thumbnailImage = results[i].ImageSets[0].ImageSet[0].TinyImage[0].URL[0];
                let productImage = results[i].ImageSets[0].ImageSet[0].LargeImage[0].URL[0];
                // let productPrice = results[i].OfferSummary[0].LowestNewPrice[0].Amount[0];



                // updating price to show the displayed Amazon price
                var productPrice = 0;

                try {
                    productPrice = results[i].ItemAttributes[0].ListPrice[0].Amount[0];
                } catch(err) {
                    errorString = `Price cannot be determined for this item: ${productAsin}`;
                    productPrice = results[i].OfferSummary[0].LowestNewPrice[0].Amount[0];
                }

                let productDetailPage = (results[i].DetailPageURL.length > 0) ? results[i].DetailPageURL[0] : "";
                let productDescription = (Object.keys(itemAttributes).includes('Feature')) ? itemAttributes.Feature[0] : null;
                let productCategory = (Object.keys(itemAttributes).includes('ProductGroup')) ? itemAttributes.ProductGroup[0] : null;

                // Create new productCard for each product using above variables -JR
                let productCard = new ProductCard(productAsin, productTitle, productImage, thumbnailImage, productPrice, productDetailPage, productDescription, productCategory);

                // Push new productCard to the productCardArray -JR
                productCardArr.push(productCard);
                currentSearchResults.push(productCard);

                if (router.content.debug_mode === true) {
                    console.log("======== AMAZON API RESULTS " + i + " ===========")
                    console.log("ASIN -        " + productAsin);
                    console.log("Title -       " + productTitle);
                    console.log("Image -       " + productImage);
                    console.log("Price -       " + productPrice);
                    console.log("detail page - " + productDetailPage);
                }

        });

        // res.status(200).send({products: productCardArr, redirect: '/search'})
        res.status(200).send(productCardArr);
    };

    }).catch(err => {
        var errmsg = 'Amazon API Error'
        if (err instanceof db.mySequel.ForeignKeyConstraintError) {
            errmsg = 'Foreign key error'
         } else {
           console.log(typeof err);
         }
        res.status(500).send(errmsg);
    });

});


// search page
router.get("/search", auth, (req, res) => {
    console.log(` - requesting ${req.url}`);

    db.Category.findAll().then(categories => {

        router.content.layout = 'main';
        router.content.user = req.user;
        router.content.categories = categories;
        router.content.recipients = [];

        db.User.findOne({
            where: {
                    id: req.user.user_id
                },
                include: [{
                    model: db.Recipient,
                    attributes: ['id', 'recipient_title', 'recipient_firstname', 'recipient_lastname', 'recipient_budget', 'recipient_bio',
                                'recipient_photo']
                }]
            })

            .then( user => {


                let thisUser = user.dataValues;
                let recipients = thisUser.Recipients;

                console.log(`\n -->> User:`);
                console.log(thisUser);



                recipients.forEach(data => {
                    let recipient = data.dataValues;
                    console.log(`\n -->> Recipient:`);

                    /*
                    id
                    recipient_title
                    recipient_firstname
                    recipient_lastname
                    recipient_budget
                    recipient_bio
                    recipient_photo
                    */
                    console.log(recipient);





                    let mappingData = recipient.UserRecipients.dataValues;


                    let recipientID = mappingData.RecipientId;
                    let userID = mappingData.UserId;
                    console.log(`\n -->> Mapping:  recipient: ${recipientID} -> user: ${userID}`);

                    // id,recipient_title,recipient_firstname,recipient_lastname,recipient_budget,recipient_bio,recipient_photo
                    router.content.recipients.push(recipient)
                })

                // TODO: send last search here?
                res.render('search', router.content);
            });

    })
});


// search results
router.get("/results", auth, (req, res) => {
    console.log(` - requesting ${req.url}`);

    db.Category.findAll().then(categories => {
        router.content.layout = 'main';
        router.content.user = req.user;
        router.content.categories = categories;
        res.render('search', router.content);
    });
});


router.get("/events", function(req, res) {
    // look for the current user in the database
    db.Event.findAll().then( events => {
        // res.json(events)
        router.content.events = events;
        router.content.user = req.user;
        router.content.pagetitle = 'Events'
        res.render('events', router.content)
    })
});


// add a new event screen
router.get("/add-event", function(req, res) {
    // look for the current user in the database

    db.User.findOne({
        where: {
            UserId: router.user.user_id
        }
    })

    db.Event.findAll().then( events => {
        res.json(events)
    })
});



// RECIPIENTS

router.get("/recipient/:recipientId", auth, (req, res) => {
    db.Recipient.findOne({
        where: {
                id: req.params.recipientId
            }
        })
        .then( recipient => {
            res.send(recipient)
        })
});

// edit a recipient
router.post("/recipient/:recipientId", auth, (req, res) => {
    let data = req.body;
    db.Recipient.findOne({
        where: {
                id: req.params.recipientId
            }
        })
        .then( recipient => {
            recipient.update(
                {
                    recipient_title: data.recipient_title,
                    recipient_firstname: data.recipient_firstname,
                    recipient_lastname: data.recipient_lastname,
                    recipient_email: data.recipient_email,
                    recipient_birthday: data.recipient_birthday,
                    recipient_bio: data.recipient_bio,
                    recipient_budget: data.recipient_budget
                 })

                .then( result => {
                    res.send({message: 'success', redirect: '/profile'})
                })
        })
});


// add a new recipient
router.post("/recipients", auth, (req, res, next) => {
    let userData = (Object.keys(req.query).length > 0) ? req.query : req.body;
    router.user = req.user;
    // add a new recipient
    db.Recipient.create(
        userData
    )

    .then( recipient => {
        console.log(`- [index]: added recipient id ${recipient.id}`);
        // link the recipient
        recipient.addUser(router.user.user_id).then( user => {
            console.log(` -> linking user:`);
            console.log(user);
            res.send({ message: 'recipient added', redirect: '/profile'})
        })


    })

    .catch( err => {
        res.status(500).send({ message: err.stack, redirect: '/profile'})
    })
});


// post a gift to a recipient
router.post("/gift-saved", (req, res, next) => {
    console.log(`saving gift...`);
    res.send({message: 'saving this thing...'})
});


// post a gift to a recipient
router.post("/gift-added/:aisn/:recipientId", (req, res, next) => {

    let selectedAISN = req.params.aisn;
    let recipientId = req.params.recipientId;

    if (selectedAISN == -1) {
        console.log(`no gifts selected, returning`);
        return;
    }

    //currentSearchResults
    console.log(`saving gift ${selectedAISN} to user: ${recipientId}`);

    db.Recipient.findOne({
        where: {
            id: recipientId
        }
    })

    .then( recipient => {
        var newGift;
        currentSearchResults.forEach( item => {
            if (item.asin == selectedAISN) {
                recipient.createGift({
                    gift_name: item.title,
                    gift_aisn: item.asin,
                    gift_photo: item.thumbnail,
                    gift_description: item.description,
                    gift_url:  item.detailsURL,
                    gift_price: item.price
                })

                .then( gift => {
                    console.log(`- [debug]: gift saved to recipient: "${item.title}"`);


                })

                .then( gift => {
                    console.log(`added gift: ${gift}`);
                })
            }
        })
    });
});


// post a gift to a recipient
router.post("/gift-removed/:aisn/:recipientId", (req, res, next) => {

    let selectedAISN = req.params.aisn;
    let recipientId = req.params.recipientId;

    if (selectedAISN == -1) {
        console.log(`no gifts selected, returning`);
        return;
    }

    //currentSearchResults
    console.log(`saving gift ${selectedAISN} to user: ${recipientId}`);

    db.Recipient.findOne({
        where: {
            id: recipientId
        }
    })

    .then( recipient => {
        var newGift;
        currentSearchResults.forEach( item => {
            if (item.asin == selectedAISN) {

                // TODO: need to remove gift here
                recipient.createGift({
                    gift_name: item.title,
                    gift_aisn: item.asin,
                    gift_photo: item.thumbnail,
                    gift_description: item.description,
                    gift_url:  item.detailsURL,
                    gift_price: item.price
                })

                .then( gift => {
                    console.log(`added gift: ${gift}`);
                })
            }
        })
    });
});



// update status of a gift
router.post("/gift-purchased/:giftid/:purchased", (req, res, next) => {
    let msg = (req.params.purchased == 1) ? 'purchased' : "didn't purchase"

    console.log(`${msg} gift id: ${req.params.giftid}`);

    db.Gift.findOne({
        where: {
            id: req.params.giftid
        },

        // include recipient and the owning user
        include: [{
            model: db.Recipient
        }]
    })

    .then( gift => {
        gift.update(
            { gift_purchased: true })

            .then( result => {
                result
                res.send({message: 'success'})
            })
    })

    .catch(err => {
        res.json(err);
    });
});


// remove a saved gift
router.post("/gift-removed/:giftid", (req, res, next) => {

    console.log(`removing gift id: ${req.params.giftid}`);

    db.Gift.destroy({
        where: {
            id: req.params.giftid
        }
    })

    .then( rows => {
        res.send({status: 200, row: rows})
    })

    .catch(err => {
        res.json(err);
    });
});

// EVENTS

// add a new recipient
router.post("/events", (req, res, next) => {
    let eventData = (Object.keys(req.query).length > 0) ? req.query : req.body;

    console.log(` - requesting ${req.url}`);

    // look for the current user in the database
    db.Event.create(
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


// export the router
module.exports = router;
