var express 	= require('express'),
	config		= require('../config/config'),
	async 		= require('async'),
	erroneous	= require('../services/erroneous');

var Shop		= require('../model/shop').model;
var Product		= require('../model/product').model;

var app 	= module.exports = express();

(function (app) 
{
	app.get('/shops', function (req, res, next) 
	{
		async.waterfall([
			function (callback) 
			{
				Shop.find({}).populate('showcase').exec(callback);
			},
			function (shops, callback) 
			{
				res.json(200, { shops: shops });
			}
		], next);
	});
	
	app.get('/hello', function (req, res, next)
	{
		res.json(200, { done: 'done' });
	});
})(app);