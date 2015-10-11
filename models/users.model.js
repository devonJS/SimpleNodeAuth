var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs')
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    local: {
        username: String,
        email: String,
        password: String
    },
    facebook : {
        accessToken: String,
        userID: String,
        signedRequest: String
    }
});

function isHashing() {
    console.log('hashing in progress...');
}
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.local.password)
};

module.exports = mongoose.model('User', UserSchema);
