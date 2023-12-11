# Project Name: pushkar-assignment-book-matching

## Overview
This project is a web application that facilitates matching users with books based on their preferences. It utilizes a backend built with Node.js and Express, and a frontend built with React.

## Backend
The backend is implemented using Node.js and Express. It includes functionality for handling user requests, connecting to a database, and performing book matching based on user preferences.

### Important Files
- `index.js`: Contains the main server setup, database connection, and book matching logic.
- `connections/dbConnection.js`: Handles the database connection setup.
- `modal/bookModal.js` and `modal/userModal.js`: Define the data models for books and users.
- `utils/euclideanDistance.js`: Provides a utility function for calculating Euclidean distance for book matching.

## Frontend
The frontend is built using React and includes scripts for development, testing, and production builds.

### Important Files
- `client/README.md`: Contains information about available scripts, deployment, and advanced configuration for the frontend.
- `client/public/index.html`: Provides the main HTML file for the React app.
- `client/src/index.css`: Defines the global styles for the React app.

## Getting Started
To start the app in development mode, run `node index.js`.

