const dialog = document.querySelector("dialog");
dialog.showModal()

function showModal() {
    dialog.showModal()
}

function closeModal() {
    dialog.close()
}

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

/**
 * 
 * @param {Book} book a book to add to the library
 */
function addBookToLibrary(book) {
    myLibrary.push(book)
}