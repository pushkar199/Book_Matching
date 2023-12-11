

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  interestInFantasy: Number,
  preferenceForShortStories: Number,
  likingForColorfulNarratives: Number,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;