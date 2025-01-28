# Note-Taking Website

> A simple yet powerful note-taking application built with **Node.js**, **Express.js**, **MongoDB**, and a vanilla **HTML/CSS/JS** front-end. This project supports user authentication with **JSON Web Tokens (JWT)**, allowing each user to securely manage their notes (create, read, update, and delete).

## Table of Contents

1. [Overview](#overview)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Project Structure](#project-structure)  
5. [Installation and Setup](#installation-and-setup)  
6. [Usage](#usage)  
7. [API Endpoints](#api-endpoints)  
8. [Troubleshooting](#troubleshooting)  
9. [Contributing](#contributing)  
10. [License](#license)

---

## Overview

This **Note-Taking Website** provides a straightforward way to manage personal notes. Users can sign up, log in, and perform CRUD operations on their notes. The project demonstrates a **full-stack** approach:

- **Front-End**: Traditional HTML/CSS/JS pages for registration, login, listing notes, creating new notes, and editing existing ones.
- **Back-End**: Node.js/Express server that handles authentication and note operations, with data persisted in MongoDB.

---

## Features

- **User Authentication**:  
  - Register new users with hashed passwords (using `bcryptjs`).  
  - Login with JWT-based authentication (token stored in a secure cookie).

- **CRUD Operations for Notes**:
  - **Create** a new note.
  - **Read** all notes belonging to the logged-in user.
  - **Update** an existing note’s content.
  - **Delete** a note permanently.

- **User-Specific Data**:  
  Each note is tied to a specific user, so no one else can view, edit, or delete your notes.

- **Responsive Design** (basic):  
  - The front-end pages are structured with simple styling in mind.  
  - Additional CSS or UI frameworks can be incorporated for advanced responsiveness.

---

## Tech Stack

- **Node.js (v20+)** for server-side JavaScript runtime  
- **Express.js (v4+)** as the primary web framework  
- **MongoDB (v6+ / v7+)** for data persistence (NoSQL)  
- **Mongoose (v8+)** ODM library for MongoDB  
- **JWT (jsonwebtoken)** for authentication tokens  
- **bcryptjs** for password hashing  
- **Vanilla HTML/CSS/JS** for the front-end

---

## Project Structure

```plaintext
Webstack-Portfolio/
├── .env                 // Environment variables (MONGODB_URI, JWT_SECRET, PORT, etc.)
├── app.js               // Main Express server file
├── config/
│   └── db.js            // Connects to MongoDB using Mongoose
├── controllers/
│   ├── authController.js   // Handles user registration & login
│   └── noteController.js   // Handles note creation, reading, updating, & deletion
├── middleware/
│   └── auth.js          // JWT-based authentication middleware
├── models/
│   ├── User.js          // Mongoose schema/model for User
│   └── Note.js          // Mongoose schema/model for Note
├── routes/
│   ├── auth.js          // Routes for /api/auth (register & login)
│   └── note.js          // Routes for /api/notes (CRUD operations)
├── frontend/
│   ├── index.html       // Landing/home page
│   ├── login.html       // User login page
│   ├── register.html    // User registration page
│   ├── notes.html       // Main notes listing
│   ├── create-note.html // Page for creating a new note
│   ├── edit-note.html   // Page for editing an existing note
│   ├── script.js        // Front-end logic (fetch calls, form handlers)
│   └── styles.css       // Basic styling
└── package.json         // Project metadata & dependencies
```

---

## Installation and Setup

1. **Clone or Download the Repo**  
   ```bash
   git clone https://github.com/AhmedSamy9828/Webstack-Portfolio.git
   cd Webstack-Portfolio
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```

3. **Create a `.env` File** in the project root, for example:
   ```bash
   MONGODB_URI=mongodb://localhost:27017/notes-app
   JWT_SECRET=YourSuperSecretKey
   PORT=5000
   ```
   - Make sure your **MongoDB** instance is running locally on `27017` or adjust the URI.

4. **Run the Application**  
   ```bash
   npm run start
   ```
   - By default, it listens on port `5000`.

5. **Open in Browser**  
   - Visit `http://localhost:5000/`  
   - Register a new user, log in, then test creating/deleting notes.

---

## Usage

1. **Register**:  
   - Navigate to `http://localhost:5000/register` or use the **Register** button on the homepage.
   - Enter a unique email and password to create an account.

2. **Login**:  
   - After registration, go to `http://localhost:5000/login`.
   - On success, you’ll see a success alert and be redirected to the `notes.html` page.

3. **Create a Note**:  
   - From the `notes.html` page, click “Create New Note”.  
   - Write the content and submit.

4. **View Notes**:  
   - All notes belonging to the logged-in user will appear on `notes.html`.

5. **Edit a Note**:  
   - Click on any note; you’ll be taken to `edit-note.html?id=<NOTE_ID>`.
   - Modify the content and hit “Save Changes”.

6. **Delete a Note**:  
   - On the notes listing page, each note has a “Delete” button.
   - Confirm the prompt; if successful, you’ll see “Note deleted successfully!” and the note will disappear.

---

## API Endpoints

| Endpoint             | Method | Description                       | Protected? |
| -------------------- | ------ | --------------------------------- | -----------|
| `/api/auth/register` | POST   | Create a new user                | No         |
| `/api/auth/login`    | POST   | Authenticate and set JWT cookie  | No         |
| `/api/notes`         | GET    | List all notes for the user      | Yes        |
| `/api/notes`         | POST   | Create a new note                | Yes        |
| `/api/notes/:id`     | PUT    | Update an existing note          | Yes        |
| `/api/notes/:id`     | DELETE | Delete an existing note          | Yes        |
| `/api/notes/:id`     | GET    | Retrieve a single note by ID     | Yes        |

> **Protected?** means it requires valid JWT (cookie) from successful login. If not provided or invalid, the server responds with 401 Unauthorized.

---

## Troubleshooting

1. **Notes are not appearing**:
   - Ensure you’re logged in and `credentials: 'include'` is set in your fetch calls.
   - Check that the note user `_id` matches the user `_id` in the DB.
   - Open dev tools, check if the request to `/api/notes` is returning 200 or 401 or something else.

2. **Delete/Update fails with "Server error"**:
   - Open your terminal logs. If you see “findByIdAndRemove is not a function,” switch to `findByIdAndDelete`.  
   - Or confirm the `_id` is correct and belongs to the logged-in user.

3. **304 Not Modified** or caching issues:
   - Disable cache in DevTools while developing, or add `res.set('Cache-Control', 'no-store')` in your routes.

4. **MongoDB connection issues**:
   - Make sure `mongod` is running on the same port as your `.env` sets.

---

## Contributing

1. **Fork** the repository.  
2. Create a new branch for your feature or bug fix.  
3. **Commit** your changes with descriptive messages.  
4. **Push** to your fork and submit a **Pull Request**.  

All contributions are welcome—whether it’s adding new features, improving documentation, or refactoring existing code.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).  
Feel free to modify and distribute as per the license terms.

---

### Contact

- **Author**: [Ahmed Samy](https://github.com/AhmedSamy9828)  
- **Email**: ahmed28samy98@gmail.com  

If you have any questions or suggestions, please open an issue or submit a pull request.

---

> **Enjoy Building & Customizing Your Note-Taking Website!**