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
    minlength: 6
  }, 
  tabs: [
  	{
  		type: Schema.Types.ObjectId,
  		ref: "Tab"
  	}
  ]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;