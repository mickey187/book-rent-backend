const jwt = require("jsonwebtoken");
const { formatToken } = require("../service/AuthService");
const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;
const verifyToken = (req, res, next) => {
  try {
        console.log('req.headers["authorization"]', req.headers["authorization"]);
    const token = req.headers["authorization"];
 
    if (!token) {
      return res
        .status(403)
        .send({ auth: false, message: "A token is required for authentication" });
    }
    const formattedToken = formatToken(req.headers["authorization"]);
    jwt.verify(formattedToken, secretKey, (err, decoded) => {
      if (err) {
        console.error("Failed to authenticate token: ",err);
        
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      } 
      req.userId = decoded.id;
      // console.log("req.userId", req.userId);
      
      next();
    });
  } catch (error) {
    console.error("auth middleware error", error);
    
  }

  };

  module.exports = {verifyToken};