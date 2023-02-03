const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

// bypass cors
app.use(cors());

// Database configuration
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// Init connection
app.listen(8000, () => {
  console.log("Connected to PORT 8000");
  db.connect();
});

// express JSON
app.use(express.json())

// Get all books
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if(err) {
        return res.json(err);
    } else {
        return res.json(data);
    }
  })
});

// Add book
app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`, `image`) VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.image];
  db.query(q, [values], (err, data) => {
    if(err) {
      return res.json(err);
  } else {
      return res.json(data);
  }
  })
});

// Delete book
app.delete("/books/:id", (req, res) => {
  const q = "DELETE FROM books WHERE id = ?";
  const bookId = req.params.id;
  db.query(q, [bookId], (err, data) => {
    if(err) {
      return res.json(err);
  } else {
      return res.json(data);
  } 
  })
});

// Update book
app.patch("/books/:id", (req, res) => {
  const q = "UPDATE books SET `title` = COALESCE(?, `title`), `desc` = COALESCE(?, `desc`), `image` = COALESCE(?, `image`) WHERE id = ?";
  const bookId = req.params.id;
  const values = [req.body.title, req.body.desc, req.body.image];
  db.query(q,[...values, bookId], (err, data) => {
    if(err) {
      return res.json(err);
  } else {
      return res.json(data);
  } 
  })
});
