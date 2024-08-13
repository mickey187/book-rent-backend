const path = require("path");
const fs = require("fs").promises;
const { AppDataSource } = require("../config/database");
const bookRepository = AppDataSource.getRepository("Book");
const userRepository = AppDataSource.getRepository("User");

const createBookService = async (bookData, bookCover) => {
  try {
    const { bookName, bookQuantity, rentPrice, ownerId } = bookData;
    const ownerUserId = await userRepository.findOne({
      where: { id: ownerId },
    });
    if (ownerUserId) {
      filePath = path.join(
        __dirname,
        "..",
        "/public/storage/book-covers",
        bookCover.originalname
      );
      await fs.writeFile(filePath, bookCover.buffer);
      const newBook = bookRepository.create({
        name: bookName,
        quantity: bookQuantity,
        rentPrice: rentPrice,
        owner: ownerUserId,
        bookCoverUrl: filePath,
      });

      await bookRepository.save(newBook);
      return newBook;
    } else {
      throw new Error("could find owner with the provided id");
    }
  } catch (error) {
    console.error("erro book create: ", error);

    throw new Error(error);
  }
};

const fetchBooksByOwnerIdService = async (ownerId) => {
  try {
    const books = await bookRepository.find({
        where: {
          owner: {
            id: ownerId,
          },
        },
        relations: ["owner"],
      });
      if (books) {
        return books;
      }else{
        throw new Error('no books fount with owner id');
      }
      
  } catch (error) {
    console.error("error on fetchBooksByOwnerIdService: ", error);
    
  }
};

const fetchAllBookService = async()=>{
try {
  const allBooks = await bookRepository.find({ relations: ["owner"]});
  return allBooks;
} catch (error) {
  throw new Error(error);
}
}

module.exports = { createBookService, fetchBooksByOwnerIdService, fetchAllBookService };
