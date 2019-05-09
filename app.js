/**
 * Represents a book.
 */
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

/**
 * Handle UI tasks.
 */
class UI {
  static displayBooks() {
    const books = Storage.getBooks();

    // Loop through the array
    // and add each book to the list (HTML Table)
    if (books != null && books != undefined)
      books.forEach((book) => { UI.addBookToList(book) });
  }

  static addBookToList(book) {
    const books = document.querySelector('#books');

    // Creating the 'tr' row and
    // adding the content for a book
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
    `;

    books.appendChild(row);
  }
}


// Storage Class: Handles storage
class Storage {
  /***
   * Returns an array object of elements.
   */
  static getBooks() {
    return JSON.parse(localStorage.getItem('books'));
  }

  /**
   * Add a book the local storage.
   * @param {*} book 
   */
  static store(book) {
    // We retrieve the books array
    // and add the new book to it
    let books = Storage.getBooks();

    if (books == undefined || books == null) {
      books = new Array();
    }

    books.push(book);

    // We modify the old array object by the new one
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event: Display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);


// Event: Add a book
document.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  const book = new Book(title, author, isbn);
  Storage.store(book);
  UI.addBookToList(book);
});

// Event: Remove a book