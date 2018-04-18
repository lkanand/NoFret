const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String, 
    require: true
  }, 
  tabs: [
  	{
  		type: Schema.Types.ObjectId,
  		ref: "Tab"
  	}
  ]
});

UserSchema.path('username').validate(function(email) {
  const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
}, "Not a valid email");

UserSchema.path('password').validate(function(password) {
  return password.length > 5;
}, "Password must be at least six characters");

const User = mongoose.model('User', UserSchema);

module.exports = User;