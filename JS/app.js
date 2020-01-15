/* eslint-env browser */

let myLibrary = JSON.parse(window.localStorage.getItem("library"));
if (myLibrary == null) {
  myLibrary = [];
}
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
    const books = myLibrary;
    books.forEach((book, index) => UI.addBookToList(book, index));
  }

  static addBookToList(book, index) {
    const list = document.getElementById("tableBody");
    const row = `<tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td><button class="btn btn-light" onclick="this.textContent= (this.textContent == 'Read') ? 'Unread' : 'Read'">${book.type}</button></td>
    <td><a href='#' data-index= ${index} class='btn btn-danger btn-sm delete'>X</a></td> 
    </tr>`;
    list.innerHTML += row;
  }

  static updateLocalStorage(array) {
    window.localStorage.setItem("library", JSON.stringify(array));
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
      const book = el.getAttribute("data-index");
      myLibrary.splice(book, 1);
      UI.updateLocalStorage(myLibrary);
    }
  }

  static clearFields() {
    const formBook = document.getElementById("form-book");
    formBook.reset();
  }

  // Add method to implement validation
  static validate(book) {
    if (book.title.length < 2 || book.author.length < 2) {
      return false;
    }
    return true;
  }

  static showAlert(type, displayMessage) {
    const message = document.getElementById("message");
    message.innerHTML = `<div class='alert alert-${type} alert-dismissible fade show' role='alert'>
                                <strong>Message:</strong>${displayMessage}
                                <button type='button' class='close' data-dismiss='alert' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                                </button>
                            </div>`;
    setTimeout(() => {
      message.innerHTML = "";
    }, 5000);
  }
}

document.addEventListener("DOMContentLoaded", UI.displayBooks());

document.getElementById("form-book").addEventListener("submit", e => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read");
  const unread = document.getElementById("unread");
  const type = read.checked ? read.value : unread.value;

  // Instatiate Book
  const book = new Book(title, author, pages, type);
  if (UI.validate(book)) {
    // Add Book to UI
    myLibrary.push(book);
    UI.updateLocalStorage(myLibrary);
    UI.addBookToList(book);
    // Clear Field
    UI.clearFields();
    UI.showAlert("success", "You have book has been added book succesefully.");
  } else {
    UI.showAlert(
      "danger",
      "Sorry you can not add this book Please fill the form."
    );
  }

  e.preventDefault();
});
// Events : To remove the book from the UI
document.querySelector("#tableBody").addEventListener("click", e => {
  UI.deleteBook(e.target);
});
