// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var jobSchema = mongoose.Schema({
    title        : {type: String, index: true},
    description  : {type: String, index: true}, 
    category     : {type: String, index: true},
    publishDate  : {type: Date, default: Date.now,   index: true},
    contacts     : [String], 
    filters      : [{question: String}]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Job', jobSchema);