const myLibrary = [];

function Book(title, author, pages, id) {
  // the constructor...
  if (!new.target) {
    throw Error("You must user the 'new' operator to call me!")
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = id;
}

function addBookToLibrary(title, author, pages) {
  // take params, create a book then store it in the array
  const id = crypto.randomUUID();
  let book = new Book(title, author, pages, id)
  myLibrary.push(book);
  return myLibrary;
}

function  displayBooks() {
  for (let book in myLibrary) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-card");
    for (let info in book){
      bookDiv.textContent(info)
    }
    document.appendChild(bookDiv);
  }
}
