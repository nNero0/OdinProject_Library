

//Constructor for Book Object
function Book(title, author, genre, read, description, id){
    this.id = id;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.read = read;
    this.description = description;
}

//Library Array which holds book objects
const myLibrary = [];

let bookA = new Book("Twelfth Night", "William Shakespeare", "Comedy", "Read", "A classic tale told by William Shakespeare in play form", 0);
let bookB = new Book("Harry Potter and the Philosopher's Stone", "JK Rowling", "Fantasy", "Read", "A Children's literature story about the world of wizardy and witchcraft.", 1);
let bookC = new Book("Lost Horizon", "James Hilton", "Fantasy / Mystery", "Read", "A missing man stumbles across a place in the Mountains of Tibet where time seems to stand still and famous person's from history live to this day", 2)

myLibrary.push(bookA);
myLibrary.push(bookB);
myLibrary.push(bookC);

//Populate list with books in the array.
generateList();

//Handling SPA Features (Displaying and Undisplaying Pages)
////Here we get the links AND the pages and assign them to veriables

let addLink = document.getElementById("add");
// let searchLink = document.getElementById("search");
let listLink = document.getElementById("list");

let addPage = document.getElementById("bookAdd");
// let genrePage = document.getElementById("genrePage");
let listPage = document.getElementById("listPage");

//Handling link clicks by adding a class that adds display: none or toggles it off. Only one page is viewable at a time. Currently, the genre search is not implemented.

addLink.addEventListener('click', () => {
    // genrePage.classList.add('invisible');
    listPage.classList.add('invisible');
    addPage.classList.toggle('invisible');
})

// searchLink.addEventListener('click', () => {
//     addPage.classList.add('invisible');
//     listPage.classList.add('invisible');
//     genrePage.classList.toggle('invisible');
// })

listLink.addEventListener('click', () => {
    // genrePage.classList.add('invisible');
    addPage.classList.add('invisible');
    listPage.classList.toggle('invisible');
    generateList()
    }
)

//Handling Form Submission of Books and Reset

let submitButton = document.getElementById("submit");
submitButton.addEventListener('click', (event) => {
    let form = document.forms.form;
    if (!form.checkValidity()){
        form.reportValidity()
    }
    else{
        event.preventDefault();
        submitBook();
    };})

function resetForm(event){
    
    document.forms.form.reset()
}

function submitBook(event){
    
    var id = myLibrary.length
    var formEl = document.forms.form;
    var formData = new FormData(formEl);
    var title = formData.get('title');
    var author = formData.get('author');
    var genre = formData.get('genre');
    var read = formData.get('readunread');
    console.log(read)
    if (read == null){
        read = "Unread";
    }
    var description = formData.get('description');
    description = description.trim();
    if(description == ""){
        description = "No description Provided";
    }
    console.log(description)
    let new_book = new Book(title, author, genre, read, description, id);
    document.getElementById("form").reset();
    console.log(new_book)
    
    myLibrary.push(new_book);
    addToRecent(new_book);
    
}

function addToRecent(new_book){
    console.log(new_book);
    let container = document.getElementById("recentlyAdded");
    let bookDiv = document.createElement("div");
    bookDiv.className = "book";
    bookDiv.innerHTML = `<p style="font-weight: bold; text-align: center; margin-bottom: 0px; font-size: 1em;">${new_book.title}</p><hr><p style="font-size: 0.9em;">Author: ${new_book.author}</p><p style="font-size: 0.9em;">Genre: ${new_book.genre}</p><p data-id="${new_book.id}" class="desc" style="font-size: 0.9em;">Click for Description</p><p data-id="${new_book.id}" class="bookStatus${new_book.id}" title="Click to change" style="font-size: 0.9em;">Read Status: ${new_book.read}</p>`;
    container.appendChild(bookDiv);
    let describer = bookDiv.querySelector(".desc");
    describer.addEventListener('click', () => openDescribeModal(new_book));
    let changer = bookDiv.querySelector(`.bookStatus${new_book.id}`)
    changer.addEventListener('click', () => changeStatus(new_book.id))
    
}

//modal logic

function openDescribeModal(book){
    if (document.querySelector(".descriptionModal")){
        document.querySelector(".descriptionModal").remove()
    }
    let modal = document.createElement("div");
    modal.className = "descriptionModal";
    modal.innerHTML = `<h2>${book.title}</h2><p style="text-align: center;">${book.description}</p><p style="text-align: right" onclick="closeDescribeModal()">Close Modal</p>`;
    document.body.appendChild(modal);
}

function closeDescribeModal(){
    let modal = document.querySelector(".descriptionModal");
    modal.remove();
}

//Generating list for listings page

function generateList(){
    listContainer = document.getElementById("displayListResults");
    listContainer.innerHTML = "";
    
    myLibrary.forEach((book) => {
    let bookDiv = document.createElement("div");
    bookDiv.className = "book";
    bookDiv.innerHTML = `<p style="font-weight: bold; text-align: center; margin-bottom: 0px; font-size: 1em;">${book.title}</p><hr><p style="font-size: 0.9em;">Author: ${book.author}</p><p style="font-size: 0.9em;">Genre: ${book.genre}</p><p data-id="${book.id}" class="desc" style="font-size: 0.9em;">Click for Description</p><p data-id="${book.id}" class="bookStatus${book.id}" title="Click to change" style="font-size: 0.9em;">Read Status: ${book.read}</p>`;
    listContainer.appendChild(bookDiv);
    let describer = bookDiv.querySelector(".desc");
    describer.addEventListener('click', () => openDescribeModal(book));

    let changer = bookDiv.querySelector(`.bookStatus${book.id}`)
    changer.addEventListener('click', () => changeStatus(book.id))
    });
}

//logic for read/unread status

function changeStatus(id){
    console.log(`changing status for book ${id}`)
    myLibrary.forEach((book) => {
        
        if (book.id == id){
            console.log("match")
            if (book.read == "Read"){
                book.read = "Unread";
            }
            else{
                book.read = "Read"
            }
        
            elements = document.querySelectorAll(`.bookStatus${id}`);
        
        for(let element of elements){
            element.innerHTML = `Read Status: ${book.read}`
        }

        }
    })
}