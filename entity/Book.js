const {EntitySchema } = require('typeorm');
const bcrypt = require('bcrypt');

 const Book = new EntitySchema({
    name: "Book",
    tableName: "books",
    columns: {
      id: {
        type: "int",
        primary: true,
        generated: true
      },
      name: {
        type: "varchar"
      },
      quantity: {
        type: "int"     
      },

      owner: {
        type: 'many-to-one',
        target: 'User',
        joinColumn: true,
   
      },
      isApprovedByOwner: {
        type: "boolean"
      },
      isApprovedByAdmin: {
        type: "boolean"
      },
      rentPrice: {
        type: "float"
      }
      

    },
    role: {
      type: 'many-to-one',
      target: 'Role',
      joinColumn: true,
  },
    
  });

  module.exports = Book;