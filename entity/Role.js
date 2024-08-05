
const {EntitySchema } = require('typeorm')
const Role = new EntitySchema({
    name: "Role",
    tableName: "roles",
    columns: {
      id: {
        type: "int",
        primary: true,
        generated: true,
        unique: true
      },
      name: {
        type: "varchar"
      },
      
    },
    relations: {
      users: {
          type: 'one-to-many',
          target: 'User',
          inverseSide: 'role',
      },
  },
  });

  module.exports = Role