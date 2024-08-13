const { createBookService, fetchBooksByOwnerIdService, fetchAllBookService } = require("../service/BookService")



const createBook = async(req, res) => {
    try {
        console.log(req.file)
        const book = await createBookService(req.body, req.file);
        if (book) {
            return res.json({
                message: "book created successfully",
                success: true,
                data: book
            })
        }
    } catch (error) {
        console.error(`error creating new book: ${error}`);
        return res.json({
            message: "failed to create new book: "+error.message,
            success:false
        })
    }
}

const fetchBooksByOwnerId = async(req, res)=>{
    try {
        const ownerId = req.params.ownerId;
        const books = await fetchBooksByOwnerIdService(ownerId);
        return res.json({
            success: true,
            data: books
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "could not fetch book"
        });
        
    }
}

const fetchAllBooks = async(req, res) => {
    try {
        const allBooks = await fetchAllBookService();
        return res.json({
            success: true,
            data: allBooks
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "could not fetch books"
        });
    }
}

module.exports = {createBook, fetchBooksByOwnerId, fetchAllBooks}