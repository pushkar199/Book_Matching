const express = require('express');
const cors = require('cors');
const connectDB = require('./connections/dbConnection');
const app = express();
const PORT = 5004;
const { booksdata } = require('./data/bookData');
const { usersdata } = require('./data/userData');
const Book = require('./modal/bookModal');
const User = require('./modal/userModal');
SIMILARITY_THRESHOLD = 6
MAX_MATCHES = 5
const euclideanDistance = require('./utils/euclideanDistance');

// Set up CORS
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Handle matching book request
app.post('/matching-book', async (req, res) => {
    try {
        // Extract user preferences from the request body
        const { name, interestInFantasy, preferenceForShortStories, likingForColorfulNarratives } = req.body
        // Create a new user instance
        const newUser = new User({
            name,
            interestInFantasy,
            preferenceForShortStories,
            likingForColorfulNarratives,
        });
        // Save the new user to the database
        newUser.save()

        // Create a vector of user preferences
        const userVector = [interestInFantasy, preferenceForShortStories, likingForColorfulNarratives];

        // Retrieve all books from the database
        const books = await Book.find();
        const bookMatches = [];
        // Iterate through each book to find matches
        books.forEach((book) => {
            const bookVector = [book.interestInFantasy, book.preferenceForShortStories, book.likingForColorfulNarratives];

            // Calculate the Euclidean distance between user and book preferences
            const difference = euclideanDistance(userVector, bookVector);
            // Check if the book is a match based on the similarity threshold
            if (difference < SIMILARITY_THRESHOLD) {
                bookMatches.push({ book, difference });
            }
        });

        // Sort and filter the top matches
        bookMatches.sort((a, b) => a.difference - b.difference);
        const topMatches = bookMatches.slice(0, MAX_MATCHES);

        // Return the top matches as JSON response
        return res.status(200).json({ bookMatches: topMatches });

    } catch (error) {
        // Handle any errors and send a 500 status with error message
        res.status(500).json({ error: error });
    }
});

// Initialize the database with books data
const initializeDatabase = async () => {
    try {
        // Check if books data already exists in the database
        const existingBookCount = await Book.countDocuments();
        if (existingBookCount === 0) {
            // Insert books data into the database if it doesn't exist
            await Book.insertMany(booksdata);
            console.log('Books data has been successfully inserted into the database');
        } else {
            console.log('Books data already exists in the database');
        }
    } catch (error) {
        console.error('Error initializing the database with data:', error);
    }
};

// Start the server and initialize the database
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    initializeDatabase();
});