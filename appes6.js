class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    //Create element (tr)
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">x<a></td>`;
    console.log(row);
    list.appendChild(row);
  }
  showAlert(message, className) {
    //Create div
    const div = document.createElement("div");
    //Add classes
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    //Insert alert
    container.insertBefore(div, form);

    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

//Local Storage Class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(function(book) {
      const ui = new UI();

      //Add book to UI
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    console.log(isbn);
    const books = Store.getBooks();
    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

//document Load Event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

//add book
document.getElementById("book-form").addEventListener("submit", function(e) {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  //Instantiating a book
  const book = new Book(title, author, isbn);
  //console.log(book);
  //UI
  const ui = new UI();
  console.log(ui);
  //Add book to list
  //Validate
  if (title == "" || author == "" || isbn == "") {
    ui.showAlert("Please fill in all fields", "error");
  } else {
    ui.addBookToList(book);

    //Add to LS
    Store.addBook(book);
    ui.showAlert("Book Added", "success");
    ui.clearFields();
  }

  e.preventDefault();
});

//Event listener for delete
document.getElementById("book-list").addEventListener("click", function(e) {
  const ui = new UI();
  ui.deleteBook(e.target);

  //Remove from LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  //Console show alert or delete
  ui.showAlert("Book Removed!", "success");
  e.preventDefault();
});
