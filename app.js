//Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI
function UI() {}

//Add Book to List
UI.prototype.addBookToList = function(book) {
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
};

//Show alert
UI.prototype.showAlert = function(message, className) {
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
};

UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

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
    ui.showAlert("Book Added", "success");
    ui.clearFields();
  }

  e.preventDefault();
});
