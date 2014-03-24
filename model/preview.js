/**
 * Schema di un preview
 */
var mongoose = require('mongoose');
var _        = require('underscore');
var Tag      = require('./tag').module;

exports.schema = schema = mongoose.Schema({
    name            : String,
    description     : String,
    showcase        : Boolean,
    price           : Number,
    discount        : Number,
    discountedPrice : Number,
    tag             : [Tag]
});

//Aggiungo middleware, metodi e varie allo schema

exports.model = model = mongoose.model("Preview", schema);