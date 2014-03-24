var express = require('express');
var app = express();

var config 		= require('./config/config');
var erroneous	= require('./services/erroneous');

// Let's connect to database and wait for it
mongoose.connect( 
	config.mongo_url
);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

async.waterfall([
	// Connect to mongodb
	function (callback)
	{
		db.once('open', callback);
	},
	// Run server
	function (callback) 
	{
		// Setting up global configuration for our server
		app.configure(function(){
		    app.set('views', __dirname + '/views');
		    app.set('view engine', 'twig');

		    // This section is optional and can be used to configure twig.
		    app.set('twig options', { 
		        strict_variables: false
		    });
		});

		// Compression
		app.use(express.compress());

		// Session & Body requests
		//app.use(express.cookieParser());
		app.use(express.bodyParser({ 
			uploadDir: __dirname + '/uploads/tmp',
			keepExtensions : true 
		}));
		/*app.use(express.session({
			secret	: "XPH6jxp9ssjzgTqgTWBHq76J",
			cookie	: { 
				maxAge 	: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10)
			},
			store	: new MongoStore({
				db : mongoose.connections[0].db 
			})
		}));*/

		// Importing routes and applying them
		var general 	= require('./routes/general');
		app.use(general);

		// Handling errors with Erroneous.js
		app.use(erroneous.router);

		// Let's call caller done function
		done();
	}	
]);

app.listen(process.env.PORT || process.env.NODE_PORT || 8080);