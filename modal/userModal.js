const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    interestInFantasy: Number,
    preferenceForShortStories: Number,
    likingForColorfulNarratives: Number,
});

const User = mongoose.model('User', userSchema);

module.exports = User;