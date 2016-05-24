var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var assert = require('assert');

var imageSchema = new Schema({
    path:  {
        type: String,
        required: true
    },
    extension:{
        type: String,
        required: true
    },
}, {
    timestamps: true
});



// create a propertyschema
var propertySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    areacode:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    car:{
        type:String,
        required:true
    },
    washroom:{
        type:String,
        required:true
    },
    bedroom:{
        type:String,
        required:true
    },
    propertystatus:{
        type: String,
        required:true
    },
    purchasetype:{
        type:Array,
        required:true
    },
    state:{
        type:Array,
        required:true
    },
    propertytype:{
        type:Array,
        required:true
    },
    usage: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images:[imageSchema]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
module.exports = mongoose.model('Property', propertySchema);
