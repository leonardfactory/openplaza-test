/**
 * Schema di un tag, imbarazzante
 */
var mongoose = require('mongoose');

exports.schema = schema = mongoose.Schema({
    name            : String
});

//Aggiungo middleware, metodi e varie allo schema

exports.model = model = mongoose.model("Tag", schema);