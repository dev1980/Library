// Book class: Represent book

class Book {
    constructor(title, author, pages, type){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.type = type;
    }
}

// UI class: Handle UI task
class UI {
    static displayBooks() {
        let myLibrary = [
            {
            title: 'Harry Potter',
            author: 'John Doe',
            pages: '234',
            type: 'Read'
        },
        {
            title: 'Harry Potter 2',
            author: 'John Doe',
            pages: '2777',
            type: 'Unread'
        }
    ];
    let books = myLibrary;
    books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        let list = document.getElementById('tableBody');
       let row = `<tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.type}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td> 
        </tr>`;
        list.innerHTML += row;
    }
    static deleteBook(el) {
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
    static clearFields(){
        let formBook = document.getElementById("form-book");
        formBook.reset();
    }


}

    // Instatiate Book object
let book = new Book(title, author, pages, type);
if(UI.validate(book)){
             // Add Book to UI
             UI.addBookToList(book);
             // Clear Field
            UI.clearFields();
            UI.showAlert('success', 'You have book has been added book succesefully.');
        } else {
            UI.showAlert('danger', ' Sorry you canot add this book, Please fill the form');
        }
       
    e.preventDefault();  
});
// Events : To remove the BOOK in both UI and local storage
document.querySelector('#tableBody').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
});