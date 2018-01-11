const db = require("../models/");


let pageContent = {
	title: "gifthub",   // head title
	projname: "gifthub",   // top nav app name
	table: "vendors",
	admin: false,
	vendorcount: 0
}

module.exports = function (app) {
	// vendor list
	app.get("/vendors", function (req, res) {
		console.log(` - requesting ${req.url}`);
		app.checkUserAuthentication(req);
		pageContent.pagetitle = "Vendors";
		pageContent.content = "Browse vendors here.";
		pageContent.is_logged_in = (app.user_data.user_id > 0);
		pageContent.user_firstname = app.user_data.user_firstname || 'none';

		let template = (pageContent.is_logged_in == true) ? 'vendors/index' : 'login';

		db.vendors.findAll({}).then(vendors => {
			pageContent.vendors = vendors;
			pageContent.vendorcount = vendors.length;
			res.render(template, pageContent);
		})
	});

	// add new vendor
	app.get("/vendors/add", function (req, res) {
		console.log(` - requesting ${req.url}`);
		app.checkUserAuthentication(req);

		pageContent.pagetitle = "Add Vendor";
		pageContent.content = "Submit a new vendor";
		pageContent.is_logged_in = (app.user_data.user_id > 0);
		pageContent.user_firstname = app.user_data.user_firstname || 'none';

		let template = (pageContent.is_logged_in == true) ? 'vendors/add' : 'login';

		db.vendors.findAll().then(vendors => {
			pageContent.vendors = vendors;
			res.render(template, pageContent);
		})
	});

	// add a new vendor
	app.post("/vendors", function (req, res) {
		console.log(` - posting ${req.url}`);
		let vendordata = req.body;
		db.vendors.create(vendordata,
		).then(function(data) {
			// redirect when finished
			res.json({status: "Success", redirect: '/vendors'});
		});
	});

	// get vendor detail
	app.get("/vendors/:vendor_id", function (req, res) {
		let vendor_id = req.params.vendor_id;
		app.checkUserAuthentication(req);

		pageContent.pagetitle = "Edit Vendor";
		pageContent.content = "Change vendor details";

		db.vendors.findOne({
            where: {
                vendor_id: vendor_id
              }
        }).then( vendor => {
            if (vendor) {
				console.log(vendor);

				pageContent.vendor = vendor;
				res.render('vendors/edit', pageContent);
            }
        });
	});

	// vendor edited
	app.put("/vendors/:vendor_id", function (req, res) {
		console.log(` - putting ${req.url}`);
		app.checkUserAuthentication(req);
		let vendordata = req.body;

		console.log(vendordata);

		db.vendors.update({
			vendor_name: vendordata.vendor_name,
			vendor_description: vendordata.vendor_description,
			vendor_url: vendordata.vendor_url
		}, {
			where: {
				vendor_id: req.params.vendor_id
			}
		  }).then(vendor => {
				res.json({status: "Success", redirect: '/vendors'});
		  });
	});

	// delete vendor
	app.delete("/vendors/:vendor_id", function (req, res) {
		// in the event of multiple ids passed, split them
		let vendor_id = req.params.vendor_id;
		db.vendors.destroy({
			where: { vendor_id: vendor_id}}
		).then( data => {
			res.json({status: "Success", redirect: '/vendors'});
		});
	});
};
