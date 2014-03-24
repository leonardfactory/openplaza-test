/**
 * Erroneous.js
 *
 * Provides handsome methods to handle errors in Express.js
 *
 * Erroneous is built as a middleware error-handler for
 * Express.js, put it at the bottom of your app.use()s
 * and start feeling better.
 *
 * With a simple Caster, you can throw error wherever you
 * are, with an easy syntax, using the powerful next() 
 * potential provided by the cool guys who made Express.js
 *
 * @class erroneous
 * @author Leonardo Ascione
 */
module.exports = erroneous = (function()
{
	var self = {};
	
	// @todo Sets this to global var
	self.development = true;
	
	/**
	 * Erroneous Caster
	 *
	 * The caster simply gets error variables with an easy-to-remember
	 * idiot-proof syntax, put them in a fresh object and throw
	 * it to the callback specified with .using().
	 *
	 * Usually, the callback is the next() middleware function or
	 * async.waterfall() error handling callback.
	 *
	 * All requests made in this way will be rightly processed
	 * by erroneous.router, an error express.js middleware.
	 *
	 * A single caster is created accessing to erroneous.cast
	 */
	self.Caster = function () 
	{
		var castr = {};
		
		// Easy getter to make the class idiot-proof
		castr.__defineGetter__('with', function(){ return castr; });
		castr.__defineGetter__('and',  function(){ return castr; });
		
		// So, what do you want to throw, man?
		castr.next 		= null;
		castr._status 	= null;
		castr._message 	= null;
		castr._log		= null;
		
		// Error build methods
		castr.using = function (next) 
		{
			castr.next = next;
			return castr;
		}
		
		castr.status = function (status) 
		{
			castr._status = status;
			return castr;
		}
		
		// You can pass a string or an array, it doesn't make difference.
		castr.message = castr.errors = function (message) 
		{
			castr._message = message;
			return castr;
		}
		
		castr.log = function (log) 
		{
			castr._log = log;
			return castr;
		}
		
		// When you are ready, send error with throw()
		castr.throw = function () 
		{
			castr.next({
				status	: castr._status,
				message	: castr._message,
				log		: castr._log
			});
		}
		
		return castr;
	}
	
	/**
	 * Simple getter to retrieve a new instance of Caster
	 */
	self.__defineGetter__('cast', function()
	{ 
		return self.Caster(); 
	});
	
	/**
	 * General router for errors.
	 * Customizable with status code and error message.
	 *
	 * Send a JSON response.
	 */
	self.router = function(err, req, res, next)
	{
		// @todo verbose?
		//console.log('######## Error #########');
		//console.dir(err);
		
		var status 	= 500,
			message = 'Internal Server Error';
			
		if(self.development) {
			//console.log("\n-------- Error --------");
			//console.log(err);
			
			res.json(err.status ? err.status : status, { 
				error 	: (err.message ? err.message : message), 
				log 	: (err.log ? err.log : err),
				stack	: err.stack
			});
		}
		else {
			res.json(err.status ? err.status : status, { error : (err.message ? err.message : message) });
		}
		
		// @todo next(err); ?
	}
	
	/**
	 * A logger to print server side errors.
	 */
	self.logger = function (err, results) 
	{
		console.log('\n--------- Error ------------');
		console.log(err);
	}
	
	/**
	 * Namespace for test middlewares
	 */
	self.test = {};
	
	/**
	 * Put this at the top of a function middlewares to
	 * test its reachibility and to dump params.
	 */
	self.test.dump = function (req, res, next) 
	{
		console.log('#### Dumped params');
		console.log(req.params);
		
		next();
	}
	
	/**
	 * Logs errors when we are outside Express.js
	 */
	self.test.logError = function (err, results) 
	{
		if(err) {
			console.log('Error found.');
		}
		else {
			console.log('No errors.');
		}
	}
	
	return self;
})();