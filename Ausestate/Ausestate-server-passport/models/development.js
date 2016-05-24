var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var assert = require('assert');


// create a partnersiteschema
var devSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description:{
        type:String,
        required:true
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
module.exports = mongoose.model('Development', devSchema);
