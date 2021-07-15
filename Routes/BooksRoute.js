const express = require("express");
const booksController = require("../Controllers/BooksController");
const router = express.Router();

router.post("/addbook", booksController.addBook);
router.get("/retreivebooks", booksController.retreiveBooks);
router.get("/retreivebookbyid/:id", booksController.retreiveBookById);
router.put("/updatebook/:id", booksController.updateBook);
router.delete("/deletebook/:id", booksController.deleteBook);

module.exports = router;
