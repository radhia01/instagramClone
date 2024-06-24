const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  Useravatar: {
    type: String,
  },
  user: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  gender: {
    type: String,
  },
  phone: {
    type: String,
  },
  followers: {
    type: Array,
  },
});

module.exports = mongoose.model("User", UserSchema);
