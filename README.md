# Webstack-Portfolio

## Introduction

Webstack-Portfolio is a web application designed to manage user authentication and note-taking. It utilizes the following technologies:

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing user and note data.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **JWT**: JSON Web Token for secure authentication.
- **bcryptjs**: Library for hashing passwords.

## Project Structure

```plaintext
Webstack-Portfolio/
│
├── app.js
├── package.json
├── package-lock.json
├── config/
│   └── db.js
├── models/
│   └── User.js
│   └── Note.js
├── routes/
│   └── auth.js
│   └── notes.js
├── middleware/
│   └── auth.js
├── controllers/
│   └── authController.js
│   └── noteController.js
```



## File and Folder Descriptions

### app.js
The main entry point of the application. It sets up the Express server, connects to the MongoDB database, defines middleware, and routes.

### package.json and package-lock.json
- **package.json**: Contains metadata about the project and its dependencies.
- **package-lock.json**: Describes the exact version of each dependency installed.

## config/db.js
Contains the logic for connecting to the MongoDB database using Mongoose.

## models/User.js
Defines the User schema and model. Handles password hashing using bcryptjs.

## models/Note.js
Defines the Note schema and model.

## routes/auth.js
Defines routes for user registration and login.

## routes/notes.js
Defines routes for creating, retrieving, and updating notes. Uses the auth middleware to ensure only authenticated users can access these routes.

## middleware/auth.js
Middleware for verifying JWT tokens and protecting routes.

## controllers/authController.js
Handles user registration and login.

## controllers/noteController.js
Handles note operations such as creating, retrieving, and updating notes.


## Conclusion
This project provides a basic setup for a note-taking application with user authentication. It demonstrates how to structure a Node.js project with Express, MongoDB, and Mongoose, and how to implement authentication using JWT.