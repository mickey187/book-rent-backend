const dotenv = require('dotenv');
const { createConnection, DataSource } = require("typeorm");
const User = require("../entity/User.js");
const Role = require("../entity/Role.js");
const Book = require("../entity/Book.js");
const Wallet = require("../entity/Wallet.js");
const BookRent = require("../entity/BookRent.js");
const fs = require('fs');
const path = require('path');
dotenv.config();

const sslPath = path.join(__dirname, '..', 'config','ca.pem');
const connectionOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    autoLoadEntities: true,
    logging: false,
    ssl: {
      ca: fs.readFileSync(sslPath).toString(),
      
      rejectUnauthorized: false, // Ensure server certificate is valid
    },
    
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