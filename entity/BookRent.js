const { EntitySchema } = require("typeorm");
const bcrypt = require("bcrypt");

const BookRent = new EntitySchema({
  name: "BookRent",
  tableName: "book_rent",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    // ownerId: {
    //   type: "int",
    // },
    // renterId: {
    //   type: "int",
    // },
    rentedOn: {
      type: "timestamp",
    },
    returnedOn: {
        type: "timestamp",
        nullable: true
    }
  },
  relations: {
    
    book: {
      type: "many-to-one",
      target: "Book",
      joinColumn: true,
      eager: true,
    },
    owner: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      eager: true,
    },
    renter: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      eager: true,
    }

  },
});

module.exports = BookRent;
