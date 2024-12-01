// App initiallization
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware configuration
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'ecomonie_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 3600000,
    },
  })
);

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecomonie_db',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database!');
});

const isAdmin = (req, res, next) => {
  if (req.session.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access restricted to admins' });
  }
  next();
};

const authenticateToken = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Access Denied: Please log in.' });
  }
  next();
};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: 'Failed to log out' });
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, hashedPassword], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'User registered successfully!' });
  });
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ message: 'User not found' });

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

    req.session.user = {
      id: user.id,
      role: user.role,
    };
    if (user.role == 'admin') {
      res.redirect('/admin/dashboard');
    } else {
      res.status(200).json({ message: 'Login successful' });
    }
  });
});

app.get('/profile', authenticateToken, (req, res) => {
  const userId = req.user.id;

  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(results[0]);
  });
});

app.get('/schedule', authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'schedule.html'));
});

app.post('/schedule', authenticateToken, (req, res) => {
  const { collectorId, date, time } = req.body;
  const userId = req.user.id;

  const sql = 'INSERT INTO plans (user_id, collector_id, date, time) VALUES (?, ?, ?, ?)';
  db.query(sql, [userId, collectorId, date, time], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Plan scheduled successfully!' });
  });
});

app.get('/admin/dashboard', isAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin-dashboard.html'));
});

app.get('/admin/manage-users', authenticateToken, isAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin-users.html'));
});

app.get('/admin/view-plans', authenticateToken, isAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin-plans.html'));
});

app.get('/admin/users', authenticateToken, isAdmin, (req, res) => {
  const sql = 'SELECT id, name, email, coins FROM users';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

app.post('/admin/users', authenticateToken, isAdmin, (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, hashedPassword], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'User added successfully!' });
  });
});

app.put('/admin/users/:id/coins', authenticateToken, isAdmin, (req, res) => {
  const { coins } = req.body;
  const userId = req.params.id;

  const sql = 'UPDATE users SET coins = ? WHERE id = ?';
  db.query(sql, [coins, userId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'User coins updated successfully!' });
  });
});

app.delete('/admin/users/:id', authenticateToken, isAdmin, (req, res) => {
  const userId = req.params.id;

  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [userId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'User deleted successfully!' });
  });
});

app.get('/admin/plans', authenticateToken, (req, res) => {
  const sql = `
    SELECT p.id, u.name AS user_name, p.collector_id, p.date, p.time
    FROM plans p
    JOIN users u ON p.user_id = u.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

app.post('/admin/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ? AND role = "admin"';
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ message: 'Admin not found or invalid credentials' });

    const admin = results[0];
    const isPasswordValid = bcrypt.compareSync(password, admin.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: admin.id, role: admin.role }, 'jwtsecret123', { expiresIn: '2h' });
    res.status(200).json({ message: 'Login successful', token });
  });
});

app.get('/admin/secure-route', authenticateToken, isAdmin, (req, res) => {
  res.send('This is a secure admin route.');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});