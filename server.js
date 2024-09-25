const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.json()); // JSON formatını işlemek için
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
      return res.status(400).send('User already exists. Please choose a different username.');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
        if (err) {
          return res.status(500).send('Error registering new user');
        }
        res.status(200).send('User successfully registered! You can now <a href="/login">login</a>.');
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
      console.log(`Token for ${username}: ${token}`);
      return res.status(200).send();      
    } else {
      return res.status(400).send('Invalid username or password');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
