console.log("I'm Linet.my IP is 172.30.208.8 Mac address is 3C-55-76-1F-60-E1. Ncc student ID is:223190709")
const sqlite3 = require('sqlite3').verbose();  
const fs = require('fs');  
  
// Function to prompt the user for book details  
function promptUserForBookDetails() {  
  const readline = require('readline').createInterface({  
    input: process.stdin,  
    output: process.stdout  
  });  
  
  readline.question('Enter book title709: ', (title) => {  
    readline.question('Enter book author709: ', (author) => {  
      readline.question('Enter book ISBN709: ', (isbn) => {  
        readline.question('Enter book context709: ', (context) => {  
          readline.close();  
          insertBook(title, author, isbn, context);  
        });  
      });  
    });  
  });  
}  
  
// Function to insert a book into the database  
function insertBook(title, author, isbn, context) {  
  const db = new sqlite3.Database('./books.db', (err) => {  
    if (err) {  
      return console.error(err.message);  
    }  
  
    console.log('Connected to the book database.');  
  
    // Create the table if it doesn't exist  
    db.run('CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title709 TEXT, author709 TEXT, isbn709 TEXT, context709 TEXT)', [], (err) => {  
      if (err) {  
        return console.error(err.message);  
        promptUserForBookDetails();
      }  
  
      // Insert the book details into the table  
      const stmt = db.prepare('INSERT INTO books (title709, author709, isbn709, context709) VALUES (?, ?, ?, ?)');  
      stmt.run(title, author, isbn, context, (err) => {  
        if (err) {  
          return console.error(err.message);  
        }  
        console.log('Book added successfully.');  
        stmt.finalize();  
        db.close((err) => {  
          if (err) {  
            console.error(err.message);  
          }  
          console.log('Database connection closed.');  
          promptUserForMoreBooks();  
        });  
      });  
    });  
  });  
}  
  
// Function to prompt the user if they want to add more books  
function promptUserForMoreBooks() {  
  const readline = require('readline').createInterface({  
    input: process.stdin,  
    output: process.stdout  
  });  
  
  readline.question('Do you want to add more books? (yes/no): ', (answer) => {  
    readline.close();  
    if (answer.toLowerCase() === 'yes') {  
      promptUserForBookDetails();  
    } else {  
      listAllBooks();  
    }  
  });  
}  
  
// Function to list all books from the database  
function listAllBooks() {  
  const db = new sqlite3.Database('./books.db', (err) => {  
    if (err) {  
      return console.error(err.message);  
    }  
  
    console.log('Connected to the book database.');  
  
    db.all('SELECT * FROM books', [], (err, rows) => {  
      if (err) {  
        return console.error(err.message);  
      }  
  
      rows.forEach((row)=>{
        console.log(`ID: ${row.id}, title709: ${row.title709}, author709: ${row.author709}, ISBN709: ${row.isbn709}, context709: ${row.context709}`);
      }) 

      db.close((err) => {  
        if (err) {  
          console.error(err.message);  
        }  
        console.log('Database connection closed.');  
        process.exit(0);  
      });  
    });  
  });  
}  
  
// Start the process by asking the user for book details  
promptUserForBookDetails();
