// server module
const express = require('express');
const bp = require('body-parser');
const exphbs = require("express-handlebars");
const path = require("path");
const cookieParser = require('cookie-parser')
const db = require("./models");


// use process.env for heroku
const port = process.env.PORT || 5000;


// create & configure express app
var app = express();
app.use(cookieParser());


app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(bp.text());
app.use(bp.json({ type: "application/vnd.api+json" }));

// setup
require("./config/init")(app);
require("./config/auth")(app);


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
require("./routes/login")(app);
require("./routes/index")(app);
require("./routes/events")(app);
require("./routes/profile")(app);
require("./routes/search")(app);
require("./routes/user")(app);
require("./routes/amazon")(app);
require("./routes/recipients")(app);
//  test routes
require("./routes/test")(app);
require("./routes/api")(app);
require("./routes/dbtest")(app);


// sync database and run app
db.sequelize.sync().then(function () {
	app.listen(port, function () {
		console.log("App listening on PORT " + port);
	});
});
