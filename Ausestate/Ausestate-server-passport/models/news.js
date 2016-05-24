var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var assert = require('assert');


// create a propertyschema
var newsSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author:{
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('News', newsSchema);