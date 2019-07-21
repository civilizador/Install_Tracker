const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require('bcryptjs');

// Schema for user model. Basically a prototype object

const UserSchema = new mongoose.Schema({
    username : String,
    password: String,
    admin:{
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    projects: {
        type: Array,
        default: [{projectId:'Nothing here yet', 
                projectName: 'Nothing is assigned', 
                projectStartDate: 'No date assigned', 
                projectStartTime: 'No Start Time assigned'}]
    },
    directManagerName: {
        type: String
    },
    directManagerEmail: {
        type: String
    },
    region: {
       type: String,
       required: true
    },
    email: {
        type: String,
        required: true
    },
    lat:{
        type: Number,
        default: 00000
    },
    lng:{
        type: Number,
        default: 00000
    },
    phone:{
        type: Number,
        required: true
    },
    projectId: {
        type: String,
        default: 'Nothing is Assigned'
    },
    status:{
        type: String,
        default: 'Not started'
    },
    installAddress: {
        type: String,
        default: 'Nothing is Assigned'
    },
    archive: Array
})
// Connecting passport plugin to work with Local Strategy. This step is REQUIRED!

// UserSchema.plugin(passportLocalMongoose);
var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
