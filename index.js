const express = require("express");
const bcrypt = require("bcrypt");
const connectToDatabase = require("./utils/db.connection");
const User = require("./models/user.model");
const usersRoutes  =  require('./routes/users.routes')
const dotenv = require("dotenv")
const cors =  require('cors')
dotenv.config();

const app = express();
const PORT = 3200;

// turn req json to javascript object
app.use(express.json());
app.use(cors())

// routing


app.use('/', usersRoutes)

connectToDatabase();

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
