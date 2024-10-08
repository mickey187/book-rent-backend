const { EntitySchema } = require("typeorm");
const bcrypt = require("bcrypt");

const User = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    firstName: {
      type: "varchar",
    },
    lastName: {
      type: "varchar",
    },
    email: {
      type: "varchar",
      unique: true,
    },
    password: {
      type: "varchar",
    },
    phone: {
      type: "varchar",
      nullable: true,
    },
    location: {
      type: "varchar",
      nullable: true,
    },
  },
  isActive: {
    type: "boolean",
  },
  relations: {
    role: {
      type: "many-to-one",
      target: "Role",
      joinColumn: true,
    },

    books: {
      type: "one-to-many",
      target: "Book",
      joinColumn: true,
    },
  },
});

module.exports = User;
