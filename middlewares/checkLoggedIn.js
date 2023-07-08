const jwt  = require('jsonwebtoken')

const checkLoggedIn = async (req, res, next) => {
  try {
    // headers  : Authorization
    const token= req.headers.authorization
    if(!token) return res.status(401).json({message: "User unauthorized"})
    // token  ->  decrypting {  email, username, id }

    const decrypted =   jwt.verify(token , process.env.JWT_SECRET)
    req.user = decrypted ;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Internal server error" });
  }
};

module.exports = checkLoggedIn;
