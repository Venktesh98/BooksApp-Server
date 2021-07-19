const mongoose = require("mongoose");

const bookModel = mongoose.Schema({
  bookTitle: {
    type: String,
    required: true,
    unique:true
  },
  bookPrice: {
    type: Number,
    required: true,
  },
  bookAuthor: {
    type: String,
    required: true,
  },
  bookGenre: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Book", bookModel);
