// const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "user"
//   },
//   title: String,
//   description: String,
//   image: String
// });

// module.exports = mongoose.model("post", postSchema);

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'  // Make sure this matches the model name used in your User model
  },
  title: String,
  description: String,
  image: String
});

module.exports = mongoose.model('Post', postSchema);

 
