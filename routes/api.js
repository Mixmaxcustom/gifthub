const express = require("express");
const db = require('../models/')

// router for api calls
const router = express.Router();

var pageContent = {
	layout: 'api',
	projname: 'gifthub',
	is_logged_in: false
}


// api view (relative to /api)
router.get("/", (req, res) => {
	console.log(` - requesting ${req.url}`);
	res.render('api/index', pageContent);
});


module.exports = router;