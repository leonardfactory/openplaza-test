var express 	= require('express'),
	config		= require('../config/config'),
	async 		= require('async'),
	mongoose 	= require('mongoose'),
	erroneous	= require('../services/erroneous');

var Shop		= require('../model/shop').model;
var Product		= require('../model/product').model;
var Preview		= require('../model/preview').model;

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
	
	/**
	 * Crea un nuovo prodotto, con annessa anteprima, e lo registra nella vetrina del negozio.
	 */
	app.post('/product', function (req, res, next)
	{
		var _preview_id;
		
		async.waterfall([
			function (callback) 
			{
				console.log('product creation');
				Product.create({
					name 		: req.body.name,
					description	: req.body.description,
					price		: req.body.price,
					discountedPrice : req.body.discountedPrice,
					shop		: req.body.shop
				}, callback);
			},
			function (product, callback) 
			{
				console.log('preview creation');
				Preview.create({
					type	   : "product",
					target	   : product._id,
					title	   : req.body.name,
					showcase   : req.body.showcase,
					price	   : req.body.price,
					discountedPrice : req.body.discountedPrice
				}, callback);
			},
			function (preview, callback) 
			{
				console.log('saving inside shop');
				_preview_id = preview._id;
				
				Shop.update({ _id : req.body.shop }, { $push : { showcase : preview._id }}).exec(callback);
			},
			function (results, callback) 
			{
				console.log('returning');
				res.json(200, { added: true, preview_id: _preview_id});
			}
		], next);
	});
	
	/**
	 * Singolo prodotto dal db
	 */
	app.get('/product/:id', 
			function (req, res, next)
	{
		async.waterfall([
			function(callback)
			{
				Product.where('_id').equals(req.params.id).findOne(callback);
			},
			function(product, callback)
			{
				res.json(200, product);
			}
		], next);
	});
	
	app.get('/hello', function (req, res, next)
	{
		res.json(200, { done: 'done' });
	});
})(app);