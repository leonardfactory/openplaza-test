var mongoose = require("mongoose");
var _        = require('underscore');
var Tag      = require('./tag').module;

exports.schema = schema = mongoose.Schema({
    name        : String,
    description : String,
    phone       : [String],
    mail        : String,
    url         : String,
    rating      : Number,

    // Thanks to http://www.endswithsaurus.com/2009/07/lesson-in-address-storage.html
    address : {
        complete : String,

        streetNumber            : Number,
        streetNumberSuffix      : String, // A-Z
        streetName              : String,
        streetType              : String, // Street, Avenue, Strada, Rue, etc.
        streetDirection         : String, // N,W,S,O,NE..
        addressType             : String, // Ufficio, Palazzo, Appartamento, etc.
        addressTypeIdentifier   : String, // Appartamento 2B
        municipality            : String, // Comune
        province                : String, // Roma, Oregon
        postalCode              : String,
        country                 : String
    },

    position: {
        type  : [Number],
        index : '2dsphere'
    },

    networks : [
        {
            name        : String,   // Facebook, etc.
            url         : String,
            identifier  : String    // Page id, Twitter username, etc.
        }
    ],

    showcase : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref  : "Preview"
        }
    ],

    products : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref  : "Product"
        }
    ],

    /*plans : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref  : "FidelityPlan"
        }
    ],*/

    tags : [Tag]

    });


exports.model = model = mongoose.model("Shop", schema);