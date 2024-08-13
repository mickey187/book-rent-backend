const { EntitySchema } = require("typeorm");
const bcrypt = require("bcrypt");


const Book = new EntitySchema({
  name: "Book",
  tableName: "books",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    name: {
      type: "varchar",
    },
    quantity: {
      type: "int",
    },
    bookCoverUrl:{
      type: "varchar",
      nullable: true
    },

   
    isApprovedByOwner: {
      type: "boolean",
      default: false
    },
    isApprovedByAdmin: {
      type: "boolean",
      default: false
    },
    rentPrice: {
      type: "float",
    },
    status: {
      type: "enum",
      enum: ['rented', 'available'],
      default: 'available'
    }
  },
  relations: {
    
    owner: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
    },
    renter: {
      type: "many-to-many",
      target: "BookRent",
      joinColumn: true,
    }

  },
});

module.exports = Book;
