const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./stallion-rh.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    senderId INTEGER,
    recipientId INTEGER,
    content TEXT,
    FOREIGN KEY (senderId) REFERENCES users(id),
    FOREIGN KEY (recipientId) REFERENCES users(id)
  )`);
});

module.exports = db;
