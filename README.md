# Bookstore API

This is a Node.js RESTful API for managing books. Users can perform CRUD (Create, Read, Update, Delete) operations on books using this API. The API is built using Node.js and MongoDB.

## Features

- Add a new book with title, author, and summary.
- View a list of all books.
- View details of a specific book by its ID.
- Update a book's details.
- Delete a book.

## Getting Started

These instructions will help you set up and run the application on your local machine for development and testing purposes.

### Prerequisites

To run this project, you need to have Node.js and MongoDB installed on your system.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/bookstore-api.git
   cd bookstore-api


npm install

npm start


By default, the server will run on http://localhost:8000. You can change the port in the app.js file if needed.

API Endpoints
POST /books: Create a new book.
Request body should include title, author, and summary.
GET /books: Retrieve a list of all books.
GET /books/:id: Retrieve details of a specific book by its ID.
PUT /books/:id: Update a book's details by providing a new title, author, and summary in the request body.
DELETE /books/:id: Delete a book by its ID.


Example:-

Create a New Book

POST http://localhost:8000/books

{
  "title": "The Good Parts",
  "author": "Douglas Crockford",
  "summary": "A programming languages."
}

Retrieve a List of All Books

GET http://localhost:8000/books


Retrieve Details of a Specific Book

GET http://localhost:8000/books/5f8e5b456de9c509bcf84f67


Update a Book's Details

PUT http://localhost:8000/books/5f8e5b456de9c509bcf84f67

{
  "title": "The Good Parts(updated)",
  "author": "Douglas Crockford",
  "summary": "A programming languages.(updated)"
}


Delete a Book

DELETE http://localhost:8000/books/5f8e5b456de9c509bcf84f67