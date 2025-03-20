CAPSTONE PROJECT-RESUBMISSION


# Admin Login:-
Email: bijujacob@shootpro24.com
Password:123456

# User login:-    
      Email: bijubjacob@gmail.com
      Password: 123456



# Project Name
CAPSTONE PROJECT-RESUBMISSION

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies](#technologies)
4. [Frontend Setup](#frontend-setup)
5. [Backend Setup](#backend-setup)
6. [API Documentation](#api-documentation)
7. [Folder Structure](#folder-structure)
8. [Environment Variables](#environment-variables)
9. [Contributing](#contributing)
10. [License](#license)

---

## Introduction

This project is a full-stack application built with React for the front-end and Node.js with Express for the back-end. It provides an authentication system, user registration, login, role-based access, and administrative dashboard functionalities. Additionally, the system allows for managing user profiles, products, and carts.

---

## Features

- **User Authentication**: Users can sign up, log in, and maintain sessions.
- **Role-based Access Control**: Admin users can manage other users and access restricted routes.
- **Dashboard**: Both user and admin dashboards with different access levels.
- **User Profile**: Users can manage their profile, including their name, email, phone number, and profile picture.
- **Product Management**: Admins can manage product listings, and users can view and add products to the cart.
- **Real-time Token Management**: Secure JWT-based authentication with token storage in cookies.
- **File Upload**: Profile picture uploads are handled using Multer and Cloudinary for cloud storage.
- **Shopping Cart**: Users can add products to their cart and proceed with the checkout (not fully implemented).

---

## Technologies

### Frontend
- **React**: For building the user interface.
- **React Router**: For managing the app's routing.
- **Axios**: For making HTTP requests to the backend.
- **React Context API**: For state management, including user authentication state.
- **Multer/Cloudinary**: For uploading images (profile pictures).
- **JWT**: For handling authentication tokens.

### Backend
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database to store user data, products, etc.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **bcryptjs**: For password hashing.
- **jsonwebtoken (JWT)**: For handling secure authentication and authorization.
- **dotenv**: For managing environment variables.
- **Nodemailer**: For sending email notifications.
- **multer**: For handling file uploads.
- **Cloudinary**: For image cloud storage.

---

## Frontend Setup

To set up the frontend locally, follow these steps:

### Prerequisites
- Node.js installed (v14 or later).
- A code editor like VSCode.
- A browser for testing.

### Steps to run the frontend:
1. Clone the repository:
    ```bash
    git clone <https://github.com/Bijubjacob/Capstone-Project-Resubmission>
    ```

2. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```

4. Set up the environment variables:
    Create a `.env` file in the root of the frontend project and add the necessary variables:
    ```bash
    REACT_APP_API_URL=http://localhost:3000/api
    ```

5. Start the development server:
    ```bash
    npm start
    ```

6. Open the app in your browser at `http://localhost:3000`.

---

## Backend Setup

To set up the backend locally, follow these steps:

### Prerequisites
- Node.js installed (v14 or later).
- MongoDB running locally or use a cloud database like MongoDB Atlas.

### Steps to run the backend:
1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```

2. Navigate to the backend directory:
    ```bash
    cd backend
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```

4. Set up the environment variables:
    Create a `.env` file in the root of the backend project and add the following variables:
    ```bash
    MONGO_URI=mongodb://localhost:27017/your-database
    JWT_SECRET=your_jwt_secret
    EMAIL_USER=your_email@example.com
    EMAIL_PASS=your_email_password
    CLOUDINARY_URL=your_cloudinary_url
    ```

5. Run the backend server:
    ```bash
    npm run dev
    ```

6. The API should now be running at `http://localhost:3000`.

---

## API Documentation

### Authentication

- **POST /api/auth/login**: Login a user.

- **POST /api/users/register**: Register a new user.


### User Management (Admin only)

- **GET /api/admin/users**: Get a list of all users.
- **POST /api/admin/users**: Create a new user.
 

- **PUT /api/admin/users/:id**: Update a user's details.

- **DELETE /api/admin/users/:id**: Delete a user.

---

## Folder Structure

```
/backend
  /models            # Mongoose models (User, Profile, etc.)
  /routes            # API routes (auth, user, etc.)
  /middleware        # Middlewares (auth, admin, etc.)
  /utils             # Helper functions (cloudinary, etc.)
  /controllers       # Logic for handling requests (authentication, etc.)
  server.js          # Main entry point for the backend

/frontend
  /src
    /components      # Reusable components (Button, Navbar, etc.)
    /context         # React context providers (AuthContext)
    /pages           # All the page components
    /utils           # Utility functions (API requests, etc.)
    App.jsx           # Main app component
    index.jsx         # Entry point for the frontend
    .env              # Environment variables (e.g. API URL)
```

---

## Environment Variables

Here are the environment variables you need for both frontend and backend:

### Frontend (.env)
```bash
REACT_APP_API_URL=http://localhost:3000/api
```

### Backend (.env)
```bash
MONGO_URI=mongodb://localhost:27017/your-database
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
CLOUDINARY_URL=your_cloudinary_url
```

---

## Contributing

If you'd like to contribute to this project:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.


---

This README should give both front-end and back-end developers a clear understanding of how to set up the project, use the API, and contribute to it. Let me know if you need further details or adjustments!