const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book');

const app = express();
app.use(express.json());

// Connect to your MongoDB database (update the URL)
mongoose.connect('mongodb://0.0.0.0:27017/bookstore', { useNewUrlParser: true, useUnifiedTopology: true });

// CRUD operations

// Create a new book
app.post('/books', async (req, res) => {
  const { title, author, summary } = req.body;
  try {
    const book = new Book({ title, author, summary });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Could not create the book.' });
  }
});

// Get a list of all books
app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Get details of a specific book by its ID
app.get('/books/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(404).json({ error: 'Book not found.' });
  }
  res.json(book);
});

// Update a book's details
app.put('/books/:id', async (req, res) => {
  const { title, author, summary } = req.body;
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    { title, author, summary },
    { new: true }
  );
  if (!book) {
    return res.status(404).json({ error: 'Book not found.' });
  }
  res.json(book);
});

// Delete a book
app.delete('/books/:id', async (req, res) => {
  const book = await Book.findByIdAndRemove(req.params.id);
  if (!book) {
    return res.status(404).json({ error: 'Book not found.' });
  }
  res.json(book);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
