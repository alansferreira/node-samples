// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var storeAttachmentSchema = mongoose.Schema({
    name: {type: String, index: true}, 
    storeItemId: {type: Number, index: true}, 
    description: {type: String, index: true},
    
    content: {type: Buffer}, 
    contentType: {type: String}, 
    originalName: {type: String}, 
});


module.exports = mongoose.model('store-attachments', storeAttachmentSchema);