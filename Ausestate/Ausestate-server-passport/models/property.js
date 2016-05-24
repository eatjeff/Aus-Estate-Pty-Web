var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var assert = require('assert');

var imageSchema = new Schema({
    name:{
        type: String,
        required: true
    },
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

var videoSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    },
}, {
    timestamps: true
});

var schoolSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    tel:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    website:{
        type: String,
        required: true
    },
    type:{
        type:Array,
        required:true 
    },
    level:{
        type:Array,
        required:true
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
    size:{
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
    inspectionbegindate:{
        type: String,
        required: true
    },
    inspectionenddate:{
        type: String,
        required: true
    },
    inspectiontime:{
        type: String,
        required: true
    },
    auctiondate:{
        type: String,
        required: true
    },
    auctiontime:{
        type: String,
        required: true
    },
    images:[imageSchema],
    videos:[videoSchema],
    schools:[schoolSchema],
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
module.exports = mongoose.model('Property', propertySchema);
