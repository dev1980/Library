// Book class: Represent book

class Book {
    constructor(title, author, pages, type){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.type = type;
    }
}

/ UI class: Handle UI task
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

    



}