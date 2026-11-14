| Field | Details | Field | Details |
| :--- | :--- | :--- | :--- |
| **Student Name** | N. Srivardhan | | |
| **Student Registration Number** | 252U1R5110 | **Class & Section** | AIDE - 2B & 313 |
| **Study Level** <br>`UG/PG/Doctorate` | UG | **Year & Term** | II & II |
| **TOPIC** | Lab 4: Authentication and User Management | **Course** | Backend Development Fundamentals |
| **Faculty Name** | Yugandhar Gurjalwar | | |

| Field | Details |
| :--- | :--- |
| **Name of the Assessment** | Lab Report 4 |
| **Date of Submission** | 15-11-2026 |

# Authentication System using Node.js, Express & SQLite

## Project Overview

This project is a simple User Authentication System developed using Node.js, Express.js, SQLite, bcrypt, and JSON Web Tokens (JWT).

It allows users to register, log in securely, and access protected routes using JWT authentication. Passwords are encrypted using bcrypt before storing them in the database.

## Technologies Used

- Node.js
- Express.js
- SQLite
- bcrypt
- JSON Web Token (JWT)
- Postman
- JavaScript

## Project Structure

```text
Authentication-Project/
│
├── app.js
├── package.json
├── package-lock.json
├── README.md
├── .gitignore
└── screenshots/
    ├── 01-user-registration.png
    ├── 02-user-registration.png
    ├── 03-user-login.png
    ├── 04-user-login.png
    ├── 05-duplicate-registration.png
    └── 06-invalid-login.png
```

## Features

1. User Registration
2. Duplicate Username Validation
3. Secure Password Hashing using bcrypt
4. User Login
5. Password Verification
6. JWT Token Generation
7. Protected API Access
8. Invalid Token Handling

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register/` | Register a new user |
| POST | `/login/` | Login user |
| GET | Protected route | Access protected data using JWT |

## Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the Project Folder

```bash
cd Authentication-Project
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Set a JWT Secret

In PowerShell, create a random secret for the current terminal session:

```powershell
$env:JWT_SECRET = node -p "require('crypto').randomBytes(32).toString('hex')"
```

Keep this value private and do not commit it.

### 5. Start the Server

```powershell
node app.js
```

The server will start on:

```text
http://localhost:3000
```

## Testing

All APIs were tested using Postman.

The following test cases were performed:

- Successful user registration
- Duplicate username registration
- Successful user login
- Invalid password login
- JWT token generation
- Accessing protected routes
- Invalid JWT token validation

## Screenshots

Sensitive request fields and token output are redacted in the published screenshots.

1. [User registration](screenshots/01-user-registration.png)
2. [Registration request](screenshots/02-user-registration.png)
3. [User login](screenshots/03-user-login.png)
4. [Login request and response](screenshots/04-user-login.png)
5. [Duplicate registration](screenshots/05-duplicate-registration.png)
6. [Invalid login](screenshots/06-invalid-login.png)

## Security

- Passwords are stored as bcrypt hashes.
- JWT is used for authentication.
- Protected routes require a valid authentication token.
- The JWT signing secret is read from the `JWT_SECRET` environment variable and must not be committed.

## Conclusion

This project demonstrates the implementation of a basic authentication system using Node.js, Express.js, SQLite, bcrypt, and JWT. It provides secure user registration, login, password verification, and protected API access.
