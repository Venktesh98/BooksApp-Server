const BookModel = require("../Models/BookModel");
let ObjectID = require("mongodb").ObjectID;

// adds Book
exports.addBook = async (request, response) => {
  const book = await new BookModel({
    bookTitle: request.body.bookTitle,
    bookPrice: request.body.bookPrice,
    bookAuthor: request.body.bookAuthor,
    bookGenre: request.body.bookGenre,
  });
  console.log("Book:", book);

  // saves in the db
  book
    .save()
    .then((result) => {
      response.json(result);
      response.status(200).json({ message: "Book Created Successfully!" });
    })
    .catch((error) => {
      console.log("Error:", error);
      response.status(400).json({ message: "Book already exists" });
    });
};

// Retrieve Books
exports.retreiveBooks = (request, response) => {
  BookModel.find()
    .then((result) => response.status(200).json(result))
    .catch((error) => response.status(400).json(error));
};

exports.retreiveBookById = (request, response) => {
  const bookId = request.params.id;
  BookModel.findById({ _id: bookId })
    .then((result) => response.send(result))
    .catch((error) => console.log("Error:", error));
};

// updateBook
exports.updateBook = (request, response) => {
  const bookId = request.params.id;
  const bookTitle = request.body.bookTitle;
  const bookPrice = request.body.bookPrice;
  const bookAuthor = request.body.bookAuthor;
  const bookGenre = request.body.bookGenre;

  BookModel.findByIdAndUpdate(
    { _id: bookId },

    {
      $set: {
        bookTitle: bookTitle,
        bookPrice: bookPrice,
        bookAuthor: bookAuthor,
        bookGenre: bookGenre,
      },
    }
  )
    .then(() => {
      BookModel.findOne({ _id: bookId }).then((book) => {
        response.send(book);
        console.log("Updated book", book);
      });
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

// delete Book
exports.deleteBook = (request, response) => {
  const bookId = request.params.id;
  console.log("Delete Book Id:", bookId);

  BookModel.deleteOne({ _id: bookId }, (error, result) => {
    if (error) {
      console.log("Error Delete:", error);
      response.send(error);
    } else {
      console.log("Result:", result);
      response.send(result);
    }
  });
};
