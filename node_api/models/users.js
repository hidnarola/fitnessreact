//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String, required:true},
    password: {type: String, required:true},
    createdAt: {type: Date, default: Date.now},
    modifiedAt: {type: Date, default: Date.now}
}, {versionKey: false});

// Compile model from schema
var User = mongoose.model('User', userSchema, 'User');

module.exports = User;
