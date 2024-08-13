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
    const token = jwt.sign({ id: id, email: email, role: role.name }, secretKey);
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
    const { firstName, lastName, email, password, role, location, phone } = userData;
    console.log("userData", userData);
    
    console.log(("password", password));
    const salt = await bcrypt.genSalt(10);
    const encPassword = await bcrypt.hash(password, salt);
    console.log(("password", password));
    
    const userRole = await roleRepository.findOne({ where: { name: role } });
    if (userRole) {
      const user = userRepository.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: encPassword,
        role: userRole,
        location: location,
        phone: phone
      });
      await userRepository.save(user);
      return user;
    }else{
      throw new Error(`invalid role`);
    }
    
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
      relations: ["role"], // Place this inside the same object
    });
    
    console.log("user", user);
    // Check if the user exists and the password is correct
    if (!user || !bcrypt.compareSync(password, user.password)) {
      
      return false;
    } else {
      // Create a JWT token
      const token = generateToken(user);

      // Return the token to the client
      return { user: user, token: token  };
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
