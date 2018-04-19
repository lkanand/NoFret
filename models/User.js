const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

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
  return password.length > 5 && password.length < 16;
}, "Password must be between 6 and 15 characters");

UserSchema.pre('save', function(next) {
  const user = this;
  if(!user.isModified('password'))
    return next();

  bcrypt.genSalt(10, function(err, salt){
    if(err)
      return next(err);

    bcrypt.hash(user.password, salt, function(err, hash){
      if(err)
        return next(err);

      user.password = hash;

      next();
    });
  });
});

UserSchema.methods.validatePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;