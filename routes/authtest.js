/*
function userAuthentication(req, res, next) {
    console.log(`# checking user credentials...`);
    // next();
    console.log(req.cookies);
    console.log(req.headers);
    // res.json({message: 'error', redirect: '/login'});
    next();
}


module.exports = userAuthentication;
*/


module.exports = function (app) {
	// home page
	app.get("/", (req, res, next) => {
        console.log(`# checking user credentials...`);
        next();
	});
};
