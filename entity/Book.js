const {EntitySchema } = require('typeorm');
const bcrypt = require('bcrypt');

 const User = new EntitySchema({
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
   
      }
      

    },
    role: {
      type: 'many-to-one',
      target: 'Role',
      joinColumn: true,
  },
    
  });

  module.exports = User