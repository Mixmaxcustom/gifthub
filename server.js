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
// user session data
app.user_data = {user_id: -1, user_firstname: null};

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(bp.text());
app.use(bp.json({ type: "application/vnd.api+json" }));


// serve static content from the "public" 
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static("public"));
app.set('views', path.join(__dirname, 'views'));

// set render engine to handlebars
app.engine('hbs', exphbs({
	defaultLayout: 'main',
	helpers: require('./config/handlebars'),
	extname: '.hbs'
}));

app.set("view engine", "hbs");

// routing
require("./routes/index")(app);
require("./routes/users")(app);
require("./routes/categories")(app);
require("./routes/gifts")(app);
require("./routes/profile")(app);
require("./routes/login")(app);
require("./routes/vendors")(app);
require("./config/auth")(app);
require("./routes/recipients")(app);

// sync database and run app
db.sequelize.sync().then(function () {
	app.listen(port, function () {
		console.log("App listening on PORT " + port);
	});
});
