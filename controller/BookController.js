const {
  createBookService,
  fetchBooksByOwnerIdService,
  fetchAllBookService,
  approveBookService,
  unApproveBookService,
  fetchBookOwnersService,
} = require("../service/BookService");

const createBook = async (req, res) => {
  try {
    console.log("(req.userId)", req.userId);

    req.body.ownerId = req.userId;
    console.log(req.file);
    const book = await createBookService(req.body, req.file);

    if (book) {
      return res.json({
        message: "book created successfully",
        success: true,
        data: book,
      });
    }
  } catch (error) {
    console.error(`error creating new book: ${error}`);
    return res.status(500).json({
      success: false,
      message: "failed to create new book: " + error.message,
      success: false,
    });
  }
};

const fetchBooksByOwnerId = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const books = await fetchBooksByOwnerIdService(ownerId);
    return res.json({
      success: true,
      data: books,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "could not fetch book",
    });
  }
};

const fetchAllBooks = async (req, res) => {
  try {
    const allBooks = await fetchAllBookService();
    return res.json({
      success: true,
      data: allBooks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "could not fetch books",
    });
  }
};

const approveBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const updatedBook = approveBookService(bookId);
    if (updatedBook) {
      return res.status(200).json({
        success: true,
        message: "approved book",
      });
    }
  } catch (error) {
    console.error("error approving book: ", error);

    return res.status(500).json({
      success: false,
      message: "could not approve books",
    });
  }
};

const unApproveBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const updatedBook = unApproveBookService(bookId);
    if (updatedBook) {
      return res.status(200).json({
        success: true,
        message: "unapproved book",
      });
    }
  } catch (error) {
    console.error("error unapproving book: ", error);

    return res.status(500).json({
      success: false,
      message: "could not unapprove book",
    });
  }
};

const fetchBookOwners = async (req, res) => {
  try {
    const bookOwners = await fetchBookOwnersService();
    return res.status(200).json({
      success: true,
      message: "book owners found",
      data: bookOwners,
    });
  } catch (error) {
    console.error("error fetching book owner: ", error);

    return res.status(500).json({
      success: false,
      message: "error fetching book owner",
    });
  }
};

module.exports = {
  createBook,
  fetchBooksByOwnerId,
  fetchAllBooks,
  approveBook,
  unApproveBook,
  fetchBookOwners,
};
