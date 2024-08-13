const { createConnection, DataSource } = require("typeorm");
const User = require("../entity/User.js");
const Role = require("../entity/Role.js");
const Book = require("../entity/Book.js");
const Wallet = require("../entity/Wallet.js");
const BookRent = require("../entity/BookRent.js");


const connectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "book",
    synchronize: true,
    autoLoadEntities: true,
    logging: false,
    entities: [
      User, Role, Book, Wallet, BookRent
    ],
    // migrations: [
    //   "src/migration/**/*.js"
    // ],
    // subscribers: [
    //   "src/subscriber/**/*.js"
    // ]
  };
  
  const AppDataSource = new DataSource(connectionOptions);
  const connectDB = async () => {
    try {
      // await createConnection(connectionOptions);
     await AppDataSource.initialize();
      console.log("PostgreSQL connected");
    } catch (err) {
      console.error("PostgreSQL connection error", err);
      process.exit(1);
    }
  };
  
  module.exports = {connectDB, AppDataSource};