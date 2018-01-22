// database response test
const db 	= require("../models/");


module.exports = (app) => {
	app.get("/test", (req, res) => {
		console.log(` - requesting ${req.url}`);
		res.render('dbtest', app.content);
	});

	// dumb the contents of the given table to json
	app.get("/test/:table?", (req, res) => {
		let dbdata = (Object.keys(req.query).length > 0) ? req.query : req.body;
		let table = req.params.table;

		console.log(` - posting ${req.url}`);
		console.log(`    - table: ${table}`);
		console.log(dbdata);
	

		db[table].findAll().then( data => {
			res.status(200).json(data)
        }).catch( err => {
			res.status(500);
            res.json({error:err, stackError:err.stack});
		});
	});

	// dumb the contents of the given table to json
	app.post("/test/:table?", (req, res) => {
		let dbdata = (Object.keys(req.query).length > 0) ? req.query : req.body;
		let table = req.params.table;

		console.log(` - posting ${req.url}`);
		console.log(`    - table: ${table}`);
		console.log(dbdata);
	

		db[table].findAll().then( data => {
			res.status(200).json(data)
        }).catch( err => {
			res.status(500);
            res.json({error:err, stackError:err.stack});
		});
	});

};
