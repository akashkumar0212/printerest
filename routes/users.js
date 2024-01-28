const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/pinterest")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  dp: {
    type: String // You can adjust the type based on how you handle profile pictures (e.g., URL or binary data)
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  boards: {
    type: Array,
    default: []
  },
  posts: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
    }
  ],
});

userSchema.plugin(plm);

module.exports = mongoose.model('User', userSchema);

 
