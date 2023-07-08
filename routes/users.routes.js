const express = require("express");
const { signupController, getAllUsers, getUserById, updateUserById, deleteUserById, userLogin, getUserProfile } = require("../controllers/users.controller");
const checkLoggedIn = require("../middlewares/checkLoggedIn");
const router = express.Router()

router.post("/signup", signupController);

// only a logged in user can get all users ;
router.get('/allUsers'  , checkLoggedIn , getAllUsers);


router.get('/users/:id', getUserById)
router.put('/update/:id', updateUserById)
router.delete('/delete/:id',deleteUserById)
router.post('/login', userLogin)
router.get('/profile', checkLoggedIn, getUserProfile)

module.exports = router ;
