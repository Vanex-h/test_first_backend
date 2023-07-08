const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupController = async (req, res) => {
  try {
    
    // object destructuing
    const { username, email, password } = req.body;
    
    // 1. Hashing password  - bcrypt
    const hash = await bcrypt.hash(password, 10);
    console.log(hash);
    
    // 2. saving the user
    const user = new User({
      username: username,
      password: hash,
      email: email,
    });
    
    await user.save();
    
    return res.status(200).json({ message: "User saved successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  console.log(req.user)
  const users = await User.find({});
  console.log(users);
  return res.json(users);
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user) {
      return res.json(user);
    } else {
      return res.json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user) {
      user.username = req.body.username;
      user.email = req.body.email;
      await user.save();
      return res.json({ message: "User updated successfully", user });
    } else {
      return res.json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user) {
      await user.deleteOne();
      return res.json({ message: "User deleted successfully", user });
    } else {
      return res.json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const userLogin = async (req, res) => {
  try {
    // get username & password from body ;
    const { username, password } = req.body;

    // check if user with the username exists
    const user = await User.findOne({ username: username });
    if (!user) return res.status(404).json({ message: "Invalid credentials" });
    // use bcrypt to compare the password and the hash
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) return res.json({ message: "Invalid credentials" });

    //  generatinge the jwt with the user data  {  email , username , id }
    const token =  jwt.sign({
      email: user.email,
      password: user.password,
      id: user._id,
    }, process.env.JWT_SECRET);

    // send `login success , token`

    return res.json({ message : 'Login successfully', token })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: "Internal server error" });
  }
};
 const getUserProfile=async (req,res)=>{
  const userId = req.user.id ;
  const  user = await User.findById(userId);

  return res.json({ message : 'User profile found' , user})
 }
module.exports = {
  signupController,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  userLogin,
  getUserProfile,
};
