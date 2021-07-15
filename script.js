//Selectors
const title = document.querySelector('.title');
const author = document.querySelector('.author');
const submitBook = document.querySelector('.submit-book');
const bookList = document.querySelector('.book-list');

//Event Listeners
document.addEventListener('DOMContentLoaded', getBooks);
submitBook.addEventListener('click', addBook);
bookList.addEventListener('click', deleteBook);

//Functions
function addBook(event) {
  //Stop browser refresh when submit the button
  event.preventDefault();

  if (title.value === '') {
    alert('Please fill in the book title');
    title.style.border = '2px solid red';
  } else if (author.value === '') {
    alert('Please fill in the author name');
    author.style.border = '2px solid red';
  } else {
    //Create the single book div
    const book = document.createElement('div');
    book.classList.add('book');

    //Create the Li
    const newBook = document.createElement('li');
    newBook.innerText =
      toTitleCase(title.value) + ' by ' + toTitleCase(author.value);

    newBook.classList.add('book-item');
    book.appendChild(newBook);
    //ADD BOOK TO localStorage
    saveBooks(newBook.innerText);

    //Create the DELETE button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-backspace"></i>';
    deleteBtn.classList.add('delete-btn');
    book.appendChild(deleteBtn);

    //Append to the book list
    bookList.appendChild(book);

    //Clear title and author input value
    title.value = '';
    author.value = '';
    title.style.border = 'none';
    author.style.border = 'none';
  }
}

//Convert the title and author to CAPITALIZE
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function deleteBook(e) {
  const item = e.target;
  //DELETE BOOK
  if (item.classList[0] === 'delete-btn') {
    const bookItem = item.parentElement;

    //Animation
    bookItem.classList.add('slide');
    removeBooks(bookItem);
    bookItem.addEventListener('transitionend', function() {
      bookItem.remove();
    });
  }
}

function saveBooks(newBook) {
  //CHECK IF I HAVE THINGS IN THERE

  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  books.push(newBook);
  localStorage.setItem('books', JSON.stringify(books));
}

function getBooks() {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  books.forEach(function(bookListing) {
    //Create the single book div
    const book = document.createElement('div');
    book.classList.add('book');

    //Create the Li
    const newBook = document.createElement('li');
    newBook.innerText = bookListing;
    newBook.classList.add('book-item');
    book.appendChild(newBook);

    //Create the DELETE button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-backspace"></i>';
    deleteBtn.classList.add('delete-btn');
    book.appendChild(deleteBtn);

    //Append to the book list
    bookList.appendChild(book);
  });
}

function removeBooks(bookItem) {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  const bookIndex = bookItem.children[0].innerText;
  books.splice(books.indexOf(bookIndex), 1);
  localStorage.setItem('books', JSON.stringify(books));
}
