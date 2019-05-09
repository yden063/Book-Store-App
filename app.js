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
      <td><button class='btn btn-danger' id='${book.isbn}'>X</button></td>
    `;

    books.appendChild(row);
  }

  static removeBookFromList(target) {
    let trNode = target.parentNode.parentNode;
    let trNodeParent = trNode.parentNode;

    trNodeParent.removeChild(trNode);
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

  static remove(isbn) {
    const books = Storage.getBooks();
    let newBooks = new Array();

    books.forEach((book, index) => {
      if (book.isbn != isbn)
        newBooks.push(book);
    });

    console.log(newBooks);
    // We modify the old array object by the new one
    localStorage.setItem('books', JSON.stringify(newBooks));
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
document.querySelector('#books').addEventListener('click', (e) => {
  // Delete a book from the list (UI)
  // and from the local storage
  const target = e.target;
  UI.removeBookFromList(target);

  // Extract the id (isbn) to search for it 
  // and delete the book assiociated from storage
  const isbn = target.getAttribute('id');
  Storage.remove(isbn);
});
