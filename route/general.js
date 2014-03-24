var express 	= require('express'),
	config		= require('../config/config'),
	async 		= require('async'),
	erroneous	= require('../services/erroneous');

var Product		= require('../model/product').model;

var app 	= module.exports = express();

(function (app) 
{
	app.get('/products', function (req, res, next) 
	{
		async.waterfall([
			function (callback) 
			{
				callback(null);
			}
		]);
	});
	
	app.get('/hello', function (req, res, next)
	{
		res.json(200, { done: 'done' });
	});
})(app);