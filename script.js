//Constructor
function Book(Name, Author, Page, Haveread, id) {
  this.Name = Name;
  this.Author = Author;
  this.Page = Page;
  this.Haveread = Haveread;
  this.ID = id;
}

const myLibrary = [];

let BookA = new Book("Twelfth Night", "William Shakespeare", 175, "Yes", 0);
let BookB = new Book(
  "Harry Potter and the Philosopher's Stone",
  "JK Rowling",
  223,
  "No",
  1
);
let BookC = new Book("Lost Horizon", "James Hilton", 211, "No", 2);

myLibrary.push(BookA);
myLibrary.push(BookB);
myLibrary.push(BookC);

displayBook();
//Lấy thông tin từ array book và tạo từng item Book để gán vào
function displayBook() {
  let bookshelf = document.getElementById("bookshelf");

  myLibrary.forEach((Book) => {
    let divBook = document.createElement("div");
    divBook.classList.add("card", "book");

    let divBookBody = document.createElement("div");
    divBookBody.classList.add("card-body");
    divBookBody.innerHTML = `<h5 class="card-title">Book name : ${Book.Name}</h5><p class="card-text">Author : ${Book.Author}</p><p class="card-text">Pages :${Book.Page}</p><p class="card-text Bookstatus" data-id="${Book.ID}" >Have read:${Book.Haveread} </p><br><a href="#" class="btn btn-primary Bookdelete" data-id="${Book.ID}" > Delete</a>`;
    divBook.appendChild(divBookBody);
    bookshelf.appendChild(divBook);

    let changer = divBookBody.querySelector(".Bookstatus");
    changer.style.cursor = "pointer";
    changer.addEventListener("click", (event) => {
      event.preventDefault();
      let BookId = event.target.getAttribute("data-id");

      let book = myLibrary.at(BookId);
      if (book) {
        book.Haveread = book.Haveread === "Yes" ? "No" : "Yes";
      }
      console.log(book);
      console.log(myLibrary);
      bookshelf.innerHTML = " ";
      displayBook();
    });

    let Delete = divBookBody.querySelector(".Bookdelete");
    Delete.addEventListener("click", (event) => {
      event.preventDefault();
      let BookId = event.target.getAttribute("data-id");

      console.log(BookId);

      myLibrary.splice(BookId, 1);
      myLibrary.forEach((book) => {
        book.ID -= 1;
      });
      console.log(myLibrary);
      bookshelf.innerHTML = " ";
      displayBook();
    });
  });
}

function addBookToLibrary() {
  let Name = document.getElementById("Bookname").value;
  let Author = document.getElementById("Authorname").value;
  let pages = document.getElementById("pages").value;
  let reads = document.getElementsByName("Haveread");
  let read_value;
  for (let i = 0; i < reads.length; i++) {
    if (reads[i].checked) {
      read_value = reads[i].value;
    }
  }
  let nBook = new Book(Name, Author, pages, read_value, myLibrary.length);
  console.log(nBook);
  myLibrary.push(nBook);
  console.log(myLibrary);
  bookshelf.innerHTML=' '; 
  displayBook();
}

let addbtn = document.getElementById("submit");
addbtn.addEventListener("click", (event) => {
  let form = document.forms.form;
  if (!form.checkValidity()) {
    form.reportValidity();
  } else {
    event.preventDefault();
    addBookToLibrary();
  }
});

let clearBtn = document.getElementById("clearfields");
clearBtn.addEventListener("click", function () {
  form.reset();
});

// let addbtn = document.getElementById("submit");

// addbtn.addEventListener('click', function(event) {
//     let form = document.getElementById('form');

//     // Prevent the default form submission immediately
//     event.preventDefault();

//     if (form.checkValidity()) {
//         // If valid, call addBookToLibrary
//         addBookToLibrary();
//     } else {
//         // If not valid, show the validation messages
//         form.reportValidity();
//     }
// });

// document.addEventListener('DOMContentLoaded', function() {
//     const form = document.getElementById('form');
//     const submitBtn = document.getElementById('submit');

//     form.addEventListener('submit', function(event) {
//         // Always prevent the default form submission
//         event.preventDefault();
//         event.stopPropagation();

//         // Check form validity
//         if (this.checkValidity()) {
//             // If valid, call function to add book
//             addBookToLibrary();
//         } else {
//             // If not valid, show validation messages
//             this.reportValidity();
//         }
//     });

//     // Optional: Clear fields button functionality
//     const clearBtn = document.getElementById('clearfields');
//     clearBtn.addEventListener('click', function() {
//         form.reset();
//     });
// });
