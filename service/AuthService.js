require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;
const bcrypt = require("bcrypt");

const { AppDataSource } = require("../config/database");
const userRepository = AppDataSource.getRepository("User");
const roleRepository = AppDataSource.getRepository("Role");

const generateToken = (user) => {
  try {
    console.log("Secret Key: ", secretKey);
    const { id, email, role } = user;
    const token = jwt.sign({ id: id, email: email, role: role }, secretKey);
    return token;
  } catch (error) {
    throw new Error(`Error generating token ${error.message}`);
  }
};

const formatToken = (token) => {
  try {
    const tokenWithoutBearer = token.replace("Bearer ", "").replace(/\s/g, "");
    return tokenWithoutBearer;
  } catch (error) {
    throw new Error(`Error formatting JWT Token${error.message}`);
  }
};

const createUser = async (userData) => {
  try {
    const { firstName, lastName, email, password, role } = userData;
    const salt = await bcrypt.genSalt(10);
    const encPassword = await bcrypt.hash(password, salt);
    const user = userRepository.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: encPassword,
      role: role,
    });
    await userRepository.save(user);
    return user;
  } catch (error) {
    console.error(`createUserService: error creating new user ${error}`);

    throw new Error(error.message);
  }
};

const authenticateUser = async (email, password) => {
  try {
    const user = await userRepository.findOne({
      where: {
        email: email,
      },
    });

    // Check if the user exists and the password is correct
    if (!user || !bcrypt.compareSync(password, user.password)) {
      console.log("fullf");
      return false;
    } else {
      // Create a JWT token
      const token = generateToken(user);

      // Return the token to the client
      return { token: token, user: user };
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error(`Error logging in :${error.message}`);
  }
};

const creatRoleService = async (roleName) => {
  try {
    const role = roleRepository.create({name:roleName});
    await roleRepository.save(role);
    return role;
  } catch (error) {
    throw new Error( `createRole: error creating new role: ${error}`);
  }
};

module.exports = { generateToken, formatToken, createUser, authenticateUser, creatRoleService };
