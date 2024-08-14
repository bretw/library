const myLibrary = [];

// Basic Book constructor function
function Book(author, title, numberofpages, read) {
    this.author = author;
    this.title = title;
    this.numberofpages = numberofpages;
    this.read = read;
}

// Method to toggle the read status of a book
Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};

// Add Book to Library function
function addBookToLibrary(author, title, numberofpages, read) {
    const newBook = new Book(author, title, numberofpages, read);
    myLibrary.push(newBook);
}

// Add books to the library initially
addBookToLibrary('JRR Tolkien', 'The Hobbit', 400, true);
addBookToLibrary('Bret Wilkins', 'Securities Fraud', 250, false);

// Populate books HTML
function PopulateListofBooks() {
    const ListofBooks = document.getElementById('books');
    ListofBooks.innerHTML = ''; // Clear the list before populating

    for (let i = 0; i < myLibrary.length; i++) {
        const appendedBook = document.createElement("div");
        appendedBook.className = "Book";
        appendedBook.id = "book-" + i;
        appendedBook.style.padding = "15px"; // Add padding for better visual separation
        appendedBook.style.marginBottom = "20px"; // Add margin between books
        appendedBook.style.border = "1px solid #ccc"; // Add border for visual grouping
        appendedBook.style.borderRadius = "8px"; // Rounded corners for a more polished look
        appendedBook.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)"; // Subtle shadow for depth
        appendedBook.innerHTML = `
            <strong>${myLibrary[i].title}</strong><br>
            ${myLibrary[i].author}<br>
            ${myLibrary[i].numberofpages} pages<br>
        `;

        // Create and append the read status text with background color
        const readStatus = document.createElement('span');
        readStatus.textContent = myLibrary[i].read ? 'Read' : 'Not Read';
        readStatus.style.cursor = 'pointer'; // Make it look clickable
        readStatus.style.backgroundColor = myLibrary[i].read ? 'green' : 'red';
        readStatus.style.color = 'white'; // Ensure text is readable
        readStatus.style.padding = '5px 10px'; // Add padding inside the span
        readStatus.style.marginTop = '10px'; // Add margin above the status text
        readStatus.style.display = 'inline-block'; // Ensure padding and margin apply correctly
        readStatus.style.borderRadius = '5px';
        readStatus.addEventListener('click', () => {
            myLibrary[i].toggleReadStatus(); // Toggle read status
            PopulateListofBooks(); // Re-populate the list to reflect the updated status
        });

        appendedBook.appendChild(readStatus);

        // Create and append delete button on the next line
        const DeleteButton = document.createElement('button');
        DeleteButton.textContent = 'Delete';
        DeleteButton.id = "delete-button-" + i;
        DeleteButton.style.display = 'block'; // Ensures the button is on the next line
        DeleteButton.style.marginTop = '15px'; // Add some margin for better spacing
        DeleteButton.style.padding = '5px 10px'; // Add padding inside the button
        DeleteButton.style.backgroundColor = '#f44336'; // Red background for delete button
        DeleteButton.style.color = 'white'; // White text color
        DeleteButton.style.border = 'none'; // Remove default border
        DeleteButton.style.borderRadius = '5px'; // Rounded corners for the button
        DeleteButton.style.cursor = 'pointer'; // Cursor pointer to indicate clickability
        appendedBook.appendChild(DeleteButton);

        // Attach event listener to delete the book
        DeleteButton.addEventListener('click', () => {
            ClickDelete(i);
        });

        ListofBooks.appendChild(appendedBook);
    }
}

// Delete book from the library and update DOM
function ClickDelete(index) {
    myLibrary.splice(index, 1); // Remove the book from the array
    PopulateListofBooks(); // Re-populate the list with updated library
}

// Add New Book button listener
const addBookButton = document.querySelector('.AddBook');
const dialog = document.querySelector("dialog");
addBookButton.addEventListener('click', () => {
    dialog.showModal();
    document.getElementById('author-name').value = '';
    document.getElementById('book-name').value = '';
    document.getElementById('number-of-pages').value = '';
    document.getElementById('read').checked = true; // Default to 'read' radio button
});

// Add book button within modal listener
const addButton = document.querySelector('.add-book-dialog');
addButton.addEventListener('click', () => {
    const AddAuthor = document.getElementById('author-name').value;
    const AddBookName = document.getElementById('book-name').value;
    const AddPages = document.getElementById('number-of-pages').value;
    const AddRead = document.getElementById('read').checked; // True if 'read' is selected

    addBookToLibrary(AddAuthor, AddBookName, AddPages, AddRead);
    ClearListofBooks();
    PopulateListofBooks();
    dialog.close(); // Close the modal after adding the book
});

// Clear books from the DOM
function ClearListofBooks() {
    const ListofBooks = document.getElementById('books');
    ListofBooks.innerHTML = '';
}

// Initially populate the list of books when the page loads
PopulateListofBooks();
