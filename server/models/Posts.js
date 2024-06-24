const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  imag_url: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  comment: {
    type: Array,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  datePub: {
    type: Date,
    required: true,
  },
});
module.exports = mongoose.model("Posts", PostSchema);
