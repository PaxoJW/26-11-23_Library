const libraryDiv = document.querySelector("#library");

const newBookDialog = document.querySelector("dialog");
const newBookForm = document.querySelector("form");
const addBtn = document.querySelector("button.add-btn");
const clearBtn = document.querySelector("button.clear-btn");

let myLibrary = [];

function Book(title, author, pages, isRead) {
  // the constructor...
  if (!new.target) {
    throw Error("You must user the 'new' operator to call me!")
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = crypto.randomUUID();

}

function addBookToLibrary({title, author, pages, isRead}) {
  // take params, create a book then store it in the array
  let book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
}

function displayBooks() {
  libraryDiv.innerHTML = "";
  myLibrary.map(book => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-card");
    bookDiv.dataset.id = book.id;
    console.log(book);

    const deleteBookBtn = document.createElement("button");
    deleteBookBtn.setAttribute("class", "delete-book");
    const markAsReadBtn = document.createElement("button");
    markAsReadBtn.setAttribute("class", "mark-as-read");
    deleteBookBtn.innerText = "Delete";
    markAsReadBtn.innerText = "Read/Unread";

    for (let key in book){
      if (key === "id") {
        continue
      } else if (key === "isRead") {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = book.isRead;
        checkbox.addEventListener("change", () => {
          book.isRead = checkbox.checked;
        })
        bookDiv.appendChild(checkbox);
      } else {
        bookDiv.textContent += `${key}:${book[key]}`;
      }
    }
    bookDiv.appendChild(deleteBookBtn);
    bookDiv.appendChild(markAsReadBtn);
    libraryDiv.appendChild(bookDiv);

    deleteBookBtn.addEventListener("click", () => {
      //get id from div in which the button is (bookID)
      const bookID = bookDiv.dataset.id;
      const targetBookId = myLibrary.findIndex(b => b.id === bookID);
      
      myLibrary.splice(targetBookId, 1);

      displayBooks()
    })

    markAsReadBtn.addEventListener("click", () => {
      checkbox.checked ? checkbox.checked = false : checkbox.checked = true;
      book.isRead = checkbox.checked;
    })
  })
}



function clearForm(formData) {
  for (const [key, _] of formData.entries()) {
    if (key !== "isRead") {
      document.querySelector(`input[name = "${key}"]`).value = "";
    } else {
      document.querySelector(`input[name = "isRead"]`).checked = false;
    }
  }
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let book = {};
  const formData = new FormData(newBookForm);

  for (const [key, value] of formData.entries()) {
    book[key] = value;
  }
  console.log(book);
  addBookToLibrary(book);
  clearForm(formData);
  newBookDialog.close();
  displayBooks();
})

clearBtn.addEventListener("click", () => {
  const formData = new FormData(newBookForm);
  clearForm(formData);
})