
# Login-Register Project

This is a simple **Login and Register** system built with **Node.js** and **SQLite**. The system allows users to register, login, and be redirected to a specified dashboard. Passwords are securely hashed using **bcrypt**, and **JWT** (JSON Web Tokens) is used for user authentication.

## Features

- **User Registration:** Users can register with a unique username and password.
- **User Login:** Registered users can log in with their credentials.
- **Password Security:** Passwords are hashed using bcrypt for security.
- **Session Management:** After login, the user is redirected to the specified dashboard URL.
- **Error Handling:** Appropriate error messages are shown for invalid credentials or existing users during registration.

## Technologies Used

- **Node.js** with Express.js: For backend server and routing.
- **SQLite**: As a lightweight local database for storing user credentials.
- **bcrypt**: For hashing user passwords.
- **jsonwebtoken**: For managing authentication tokens (JWT).
- **HTML & CSS**: Basic frontend for the login and registration pages.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v12 or higher)
- **npm** (Node Package Manager)

## Getting Started

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/login-register-project.git
    cd login-register-project
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the application**:
    ```bash
    npm start
    ```

4. Open your browser and navigate to:
    - **Login page:** `http://localhost:3000/login`
    - **Register page:** `http://localhost:3000/register`

## Project Structure

```bash
├── views
│   ├── login.html       # Login page
│   ├── register.html    # Registration page
├── public
│   ├── style.css        # Basic styling for the forms
├── server.js            # Main server file with routes for login and register
├── package.json         # Node.js dependencies and start script
```

## Functionality

### User Registration

- The user registration page allows a user to create an account with a username and password. The username must be unique. If the username already exists, an error message will be shown.

### User Login

- After successful registration, the user can log in with the same credentials. If the login is successful, the user will be redirected to a specific dashboard URL (currently `YOUR REDIRECT URL`).

### Error Messages

- If the user enters an incorrect username or password during login, a red error message will be displayed.
- If the user attempts to register with an existing username, a red error message will be shown.

## Future Enhancements

- **Password reset functionality**: Allow users to reset their passwords.
- **JWT-based authentication for protected routes**: Implement authentication for protected routes after login.
- **Input validation**: Add client-side validation to improve user experience.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
