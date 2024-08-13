const { EntitySchema } = require("typeorm");
const bcrypt = require("bcrypt");

const Wallet = new EntitySchema({
  name: "Wallet",
  tableName: "wallet",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    balance: {
      type: "float",
    },
  },
  relations: {
    userId: {
      type: "one-to-one",
      target: "User",
      joinColumn: true,
    },
  },
});

module.exports = Wallet;
