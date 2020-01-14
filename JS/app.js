// Book class: Represent book
class Book {
  constructor(title, author, pages, type) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.type = type;
  }
}
// UI class: Handle UI task
class UI {
  static displayBooks() {
    const StoredBooks = [
      {
        title: 'Harry Potter',
        author: 'John Doe',
        pages: '234',
        type: 'Read',
      },
      {
        title: 'Sherlock Hormes',
        author: 'Dr John Doe',
        pages: '587',
        type: 'Unread',
      },
      {
        title: 'Tale of Two Cities',
        author: 'Dr Smith Doe',
        pages: '359',
        type: 'Unread',
      },
    ];
    const books = StoredBooks;
    books.forEach(book => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.getElementById('tableBody');
    const row = `<tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td>${book.type}</td>
    <td><a href='#' class='btn btn-danger btn-sm delete'>X</a></td> 
    </tr>`;
    list.innerHTML += row;
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    const formBook = document.getElementById('form-book');
    formBook.reset();
  }

  // Add method to implement validation

  static validate(book) {
    if (book.title.length < 2 || book.author.length < 2) {
      return false;
    } else {
      return true;
    }
  }

  static showAlert(type, displayMessage) {
    const message = document.getElementById('message');
    message.innerHTML = `<div class='alert alert-${type} alert-dismissible fade show' role='alert'>
                                <strong>Message:</strong>${displayMessage}
                                <button type='button' class='close' data-dismiss='alert' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                                </button>
                            </div>`;
    setTimeout(() => {
      message.innerHTML = '';
    }, 5000);
  }
}
//Event : Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks());
//Event: Add a Book
document.getElementById('form-book').addEventListener('submit', e => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read');
  const unread = document.getElementById('unread');

  if (read.checked) {
    type = read.value;
  } else if (unread.checked) {
    type = unread.value;
  }
  // Instatiate Book
  let book = new Book(title, author, pages, type);
  if (UI.validate(book)) {
    // Add Book to UI
    UI.addBookToList(book);
    // Clear Field
    UI.clearFields();
    UI.showAlert('success', 'You have book has been added book succesefully.');
  } else {
    UI.showAlert(
      'danger',
      ' Sorry you canot add this book, Please fill the form'
    );
  }

  e.preventDefault();
});
// Events : To remove the book from the list
document.querySelector('#tableBody').addEventListener('click', e => {
  UI.deleteBook(e.target);
});
