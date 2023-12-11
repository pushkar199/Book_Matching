const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // add your connection url
        await mongoose.connect('mongodb://localhost:27017/bookMatchApp', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;