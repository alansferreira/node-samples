// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var storeSchema = mongoose.Schema({
    mark: {type: String, index: true}, 
    model: {type: String, index: true}, 
    
    color: String, 
    optionals: {type: [String], index: true}, 
    
    price: {type: Number, index: true}, 
    description: String, 
});


module.exports = mongoose.model('stores', storeSchema);