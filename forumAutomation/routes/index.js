/*
 * Expose routes
 */

module.exports = Routes;

/*
 * Defines routes for application
 *
 * @param {Express} app `Express` instance.
 * @api public
 */

function Routes(app, io) {
	var config = app.get('config');
	app.engine('html', require('ejs').renderFile);

	/*
	* Homepage
	*/
	app.get('/', function(req, res, next) {
		
	});
	
	app.get('*', function(req, res) {
		log.debug("Got a URL with no handler... Using default handler... Redirecting to /. URL : " + req.hostname);
		//Setting P3P in response header
        var policyRef = req.protocol+"://"+req.hostname;
        res.set({'P3P': "CP='NOI DSP COR NID CURa TAIi OUR BUS INT PRE'; policyref='"+policyRef+"/w3c/p3p.xml';"});

		res.redirect("/");
	});
}
