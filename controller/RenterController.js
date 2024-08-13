const {
  rentBookService,
  fetchRentedBooksService,
} = require("../service/RenterService");

const rentBook = async (req, res) => {
  try {
    const rentData = req.body;
    const renterId = req.userId;
    const rentBook = await rentBookService(rentData, renterId);
    if (rentBook) {
      return res.status(200).json({
        success: true,
        message: "book rented",
        data: rentBook,
      });
    }
  } catch (error) {
    console.error("could not rent books: ", error);

    return res.status(500).json({
      success: false,
      message: "could not rent books",
    });
  }
};

const fetchRentedBooks = async (req, res) => {
  try {
    const renterId = req.userId;
    const rentedBooks = await fetchRentedBooksService(renterId);
    return res.status(200).json({
        success: true,
        message: "rented books found",
        data: rentedBooks
    })
  } catch (error) {
    console.error("could not find rented books: ", error);

    return res.status(500).json({
      success: false,
      message: "could not find rented books",
    });
  }
};

module.exports = { rentBook, fetchRentedBooks };