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
    ownerId: {
      type: "int",
    },
    renterId: {
      type: "int",
    },
    rentedOn: {
      type: "date",
    },
    returnedOn: {
        type: "date"
    }
  },
});

module.exports = BookRent;
