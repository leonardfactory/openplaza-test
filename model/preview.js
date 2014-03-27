/**
 * Schema di un preview
 */
var mongoose = require('mongoose');
var _        = require('underscore');
var Tag      = require('./tag').module;

exports.schema = schema = mongoose.Schema({
	type			: String,
	target			: String,
    title           : String,
    description     : String,
    showcase        : Boolean,
    price           : Number,
    discount        : Number,
    discountedPrice : Number,
    tag             : [Tag],
	expire			: Date
});

//Aggiungo middleware, metodi e varie allo schema

exports.model = model = mongoose.model("Preview", schema);