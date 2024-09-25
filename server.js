
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// SQLite database setup
let db = new sqlite3.Database('./users.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Create Users table if not exists
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
)`);

// Login route (GET)
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Register route (GET)
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

// Register route (POST)
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT username FROM users WHERE username = ?', [username], async (err, row) => {
    if (err) {
      return res.status(500).send('Error checking user');
    }
    if (row) {
      res.send('<p style="color:red;text-align:center;">User already exists. Please choose a different username.</p><a href="/register">Go Back</a>');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
        if (err) {
          return res.status(500).send('Error registering new user');
        }
        res.send('<p style="color:green;text-align:center;">User successfully registered! You can now <a href="/login">login</a>.</p>');
      });
    }
  });
});

// Login route (POST)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT password FROM users WHERE username = ?', [username], async (err, row) => {
    if (err) {
      return res.status(500).send('Error during login');
    }
    if (row && await bcrypt.compare(password, row.password)) {
      const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });
      res.redirect('http://mercury.digiturk.net:4723/device-farm/');
    } else {
      res.send('<p style="color:red;text-align:center;">Invalid username or password</p><a href="/login">Go Back</a>');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
