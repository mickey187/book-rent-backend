const Role = require("../entity/Role");
const User = require("../entity/User");
const {
  createUser,
  generateToken,
  authenticateUser,
} = require("../service/AuthService");

const signup = async (req, res) => {
  try {
    // const role1 = roleRepository.create({ name: 'admin' });
    // await roleRepository.save([role1]);
    const newUser = await createUser(req.body);
    if (newUser) {
      const token = generateToken(newUser);
      return res.json({
        message: "user created",
        data: newUser,
        token: token,
      });
    } else {
      throw new Error("could not create new user");
    }
  } catch (error) {
    console.error("error creating user", error);
  }
};

const signin = async(req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authenticateUser(email, password);
    
    if (token) {
      return res.status(200).json({
        statusCode: 200,
        status: "success",
        message: "Login Successful",
        data: {
          token: token,
          user: user,
        },
      });
    } else {
      return res.status(401).json({
        statusCode: 401,
        status: "error",
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      status: "error",
      message: `Error logging in: ${error.message}`,
    });
  }
};

const signout = (req, res) => {
  try {
  } catch (error) {}
};

module.exports = { signup, signin, signout };
