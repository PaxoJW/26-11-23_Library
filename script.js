const myLibrary = [];

function Book(title, author, pages, id) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = id
}

function addBookToLibrary(title, author, pages) {
  // take params, create a book then store it in the array
  const id = crypto.randomUUID();
  let book = Book(title, author, pages, id)
  myLibrary.push(book);
}