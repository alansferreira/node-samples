// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var carSchema = mongoose.Schema({
    carSpec:{
        mark: String, 
        model: String, 
        subModel: String, 
        
        color: String, 
        options: Array, 
    }, 
    
    sold: {
        price: Number, 
        description: String, 
    }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Car', carSchema);