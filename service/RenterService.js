const { AppDataSource } = require("../config/database");
const bookRepository = AppDataSource.getRepository("Book");
const userRepository = AppDataSource.getRepository("User");
const bookRentRepository = AppDataSource.getRepository("BookRent");


const rentBookService = async (rentData, renterId) => {
    try {
      const { bookId, ownerId } = rentData;
      console.log("bookId, ownerId", bookId, ownerId);
  
      const ownerUserId = await userRepository.findOne({
        where: { id: ownerId },
      });
      const renterUserId = await userRepository.findOne({
        where: { id: renterId },
      });
  
      if (!ownerUserId) {
        throw new Error(`No owner found with id ${ownerId}`);
      }
  
      if (!renterUserId) {
        throw new Error(`No renter found with id ${renterId}`);
      }
  
      const book = await bookRepository.findOne({
        where: { id: bookId },
      });
  
      console.log("boooooook", book);
  
      if (book) {
        const bookRent = bookRentRepository.create({
          book: bookId,
          owner: ownerId,
          renter: renterId,
          rentedOn: new Date(),
          returnedOn: null,
        });
  
        await bookRentRepository.save(bookRent);
  
        // Update book status and quantity
        if (book.quantity == 1) {
          book.status = 'rented';  // Set the new status
          book.quantity = 0;      // Adjust quantity if needed
        } else if (book.quantity > 1) {
          book.status = 'rented';  // Set the new status
          book.quantity -= 1;     // Decrease quantity
        }
  
        await bookRepository.save(book);  // Save the updated book
  
        return bookRent;
      } else {
        throw new Error(`Book with id ${bookId} not found`);
      }
    } catch (error) {
      console.error('Error renting book:', error);
      throw new Error(error.message);
    }
  };
  

const fetchRentedBooksService = async(renterId)=>{
    try {
        const rentedBooks = await bookRentRepository.find({
            where: { renter: renterId },
        });
        if (rentedBooks) {
            return rentedBooks
        }else{
            throw new Error('error fetching rented books');
        }
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {rentBookService, fetchRentedBooksService};