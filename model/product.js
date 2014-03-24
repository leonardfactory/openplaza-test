/**
 * ShopItem - An item in the shop that can be selled
 */
var mongoose = require("mongoose");
var _        = require('underscore');
var Tag      = require('./tag').module;

exports.schema = schema = mongoose.Schema({
    name            : String,
    description     : String,
    price           : Number,
    discount        : Number,
    discountedPrice : Number,
    stock           : Number,
    showcase        : Boolean,
    tag             : [Tag],

    preview :   {
        type : mongoose.Schema.Types.ObjectId,
        ref  : "Preview"
    },

    purchases : {
        purchased : Number,
        booked    : Number
    }
});

schema.methods.getCopy = function ()
{
    return _.pick(this, ['name', 'description', 'price', 'discount', 'discountedPrice']);
}


exports.model = model = mongoose.model("Product", schema);