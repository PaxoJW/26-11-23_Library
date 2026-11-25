let myLibrary = [];

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
  myLibrary =  [...myLibrary, book];
  return
}

let newBook = new Book("me","you",33,111111);
console.log(newBook);

const libraryDiv = document.querySelector("#library");

function  displayBooks() {
  myLibrary.map(book => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-card");
    bookDiv.dataset.id = book.id;
    console.log(book);
    for (let key in book){
      if (key === "id") {
        continue
      } else {
        bookDiv.textContent += `${key}:${book[key]}`;
      }
    }
    libraryDiv.appendChild(bookDiv);
  })  
  }

