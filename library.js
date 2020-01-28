console.log("This is library.js");

// Constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

// Display Constructor
function Display() {

}

//Add Method to display prototype
//Adding Book Object to the UI
Display.prototype.add = function (book) {
    let tableBody = document.getElementById('tableBody');
    let uiString = `
                    <tr>
                                            
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td>
                    </tr>
    `
    tableBody.innerHTML += uiString;
    // console.log("Adding to Ui");
}
//clear Form by grabbing id libraryForm.
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}
//Implement the validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    }
    else {
        return true;
    }
}
//Implement show function
Display.prototype.show = function (type, displaymessage) {
    let message = document.getElementById('message');
    message.innerHTML = `
                  <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                      <strong>Message:</strong> ${displaymessage}
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                       <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
    `
    setTimeout(function () {
        message.innerHTML = '';
    }, 2000);
}

// Add submit event listener to libraryForm id.
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);
function libraryFormSubmit(e) {
    // console.log("you have submitted form");
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }
    let book = new Book(name, author, type);
    // console.log(book);
    let display = new Display();
    if (display.validate(book)) {

        display.add(book);
        display.clear();
        display.show('success', 'Your Book has been successfully added');
    }
    else {
        display.show("danger", "Sorry! you cannot add this book");
    }
    e.preventDefault();
}
