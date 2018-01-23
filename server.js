// server module
const express 		= require('express');
const bp 			= require('body-parser');
const exphbs 		= require("express-handlebars");
const path 			= require("path");
const cookieParser 	= require('cookie-parser')
const db 			= require("./models");


// use process.env for heroku
const port = process.env.PORT || 5000;


// create & configure express app
var app = express();
app.use(cookieParser());


app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(bp.text());
app.use(bp.json({ type: "application/vnd.api+json" }));

// app globals
require("./config/init")(app);

// serve static content from the "public"
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));


// set render engine to handlebars
app.engine('hbs', exphbs({
	defaultLayout: 'main',
	helpers: require('./config/handlebars'),
	extname: '.hbs'
}));

app.set("view engine", "hbs");


//  routing
require("./routes/auth")(app);
require("./routes/index")(app);


// sync database and run app
db.sequelize.sync({ force: false }).then( () => {
	app.listen(port, () => {
		console.log("App listening on PORT " + port);
	});
});
