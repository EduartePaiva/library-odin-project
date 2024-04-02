const dialog = document.querySelector("dialog");
const form = document.querySelector("form")
const booksContainer = document.querySelector("#books-container")

function showModal() {
    dialog.showModal()
}

function closeModal() {
    dialog.close()
}

/**
 * @type {Book[]}
 */
const myLibrary = [];

/**
 * @class
 * @param {string} title title of the book
 * @param {string} author author name
 * @param {number} pages_number number of pages of the book
 * @param {boolean} have_read true if user has read the book false otherwise
 */
function Book(title, author, pages_number, have_read) {
    this.title = title
    this.author = author
    this.pages_number = pages_number
    this.have_read = have_read

}

//initial books

myLibrary.push(new Book("The Rust Programming Language", "Steve Klabnik", 527, true))
myLibrary.push(new Book("Atomic Habits", "James Clear", 289, true))
myLibrary.push(new Book("THINK and GROW RICH", "Napoleon Hill", 297, true))
myLibrary.push(new Book("Mindset", 'Carol S. Dweck', 303, false))


/**
 * 
 * @param {number} index index of the book
 * @param {Book} book book class
 * @returns {HTMLDivElement}
 */
function createOneBookElement(index, book) {
    // <div class="book-card">
    //     <span class="title">Mindset</span>
    //     <span class="author">Author: Carol S. Dweck</span>
    //     <span>Nº of pages: 303</span>
    //     <div class="read">
    //         <label for="book-input-1">Have you read? No</label>
    //         <input checked type="checkbox" name="read" id="book-input-1">
    //     </div>
    //     <button class="card-delete btn-primary">Delete</button>
    // </div>
    const bookCard = document.createElement("div")
    bookCard.classList.add("book-card")
    bookCard.id = `book-card-${index}`

    const spanTitle = document.createElement("span")
    spanTitle.classList.add("title")
    spanTitle.innerText = book.title
    bookCard.appendChild(spanTitle)

    const spanAuthor = document.createElement("span")
    spanAuthor.classList.add("author")
    spanAuthor.innerText = book.author
    bookCard.appendChild(spanAuthor)

    const spanPages = document.createElement("span")
    spanPages.innerText = book.pages_number
    bookCard.appendChild(spanPages)

    //     <div class="read">
    //         <label for="book-input-1">Have you read? No</label>
    //         <input checked type="checkbox" name="read" id="book-input-1">
    //     </div>
    const divRead = document.createElement("div")
    divRead.classList.add("read")
    const readLabel = document.createElement("label")
    readLabel.innerHTML = `Have you read? ${book.have_read ? "Yes" : "No"}`
    readLabel.setAttribute("for", `book-input-${index}`)
    divRead.appendChild(readLabel)
    const readInput = document.createElement("input")
    readInput.type = "checkbox"
    readInput.name = "read"
    readInput.id = `book-input-${index}`
    readInput.onchange = (event) => {
        const have_read = event.target.checked
        if (typeof have_read !== 'boolean') return
        myLibrary[index].have_read = have_read
        readLabel.innerHTML = `Have you read? ${have_read ? "Yes" : "No"}`
    }
    if (book.have_read) readInput.setAttribute("checked", "")
    divRead.appendChild(readInput)
    bookCard.appendChild(divRead)

    //<button class="card-delete btn-primary">Delete</button>
    const delBtn = document.createElement("button")
    delBtn.classList.add("card-delete", "btn-primary")
    delBtn.innerText = "Delete"
    delBtn.onclick = () => deleteChildFromBookshelf(index)
    bookCard.appendChild(delBtn)

    return bookCard
}



function renderBooks() {
    booksContainer.innerHTML = ""
    myLibrary.forEach((book, index) => {
        const bookCard = createOneBookElement(index, book)
        booksContainer.appendChild(bookCard)
    })
}

renderBooks()

/**
 * 
 * @param {number} index 
 */
function deleteChildFromBookshelf(index) {
    myLibrary.splice(index, 1);
    renderBooks()
}

/**
 * 
 * @param {Book} book a book to add to the library
 */
function addBookToLibrary(book) {
    myLibrary.push(book)
}

/**
 * 
 * @param {SubmitEvent} event 
 */
form.onsubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(form);
    const title = formData.get("title");
    const author = formData.get("author")
    const pages = parseInt(formData.get("pages"))
    const have_read = formData.get("read") === "on"
    const book = new Book(title, author, pages, have_read)
    addBookToLibrary(book)
    form.reset()
    closeModal()
}