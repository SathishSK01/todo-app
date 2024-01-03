const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const {userDetails} = require("../Models/userModel");

const generateToken = (userId) => {
    const secretKey = '87dd96bfe8w'; 
    const expiresIn = '1h';
    const token = jwt.sign({ userId }, secretKey, { expiresIn });
    return token;
  };
  

//Register user
const postUser = asyncHandler(async(req,res,next)=>{
    console.log("user details:",req.body);
    const {username, password} = req.body;
    if(!username || !password){
         res.status(400);
         throw new Error("Please fill all Fields");
     }
     const users = await userDetails.create({username,password});
     res.status(200).json(users); 
});

//User Login
const userLogin = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400);
      throw new Error("Authentication Failed");
    }
    // Check if the user exists in the database
    const existingUser = await userDetails.findOne({ username });
    if (!existingUser) {
      res.status(401);
      throw new Error("User not registered");
    }
    const token = generateToken(existingUser._id);
    res.status(200).json({ token });
  });

//Get user
const getUser = asyncHandler(async(req,res)=>{
    const users = await userDetails.find();
    res.status(200).json(users);
});

//update user
const updateUser = asyncHandler(async(req,res)=>{
    res.status(200).json({message: `Update the user for ${req.params.id}`});
});

//Delete user
const deleteUser = asyncHandler(async(req,res)=>{
    res.status(200).json({message: `Delete the user for ${req.params.id}`});
});

module.exports = {postUser,getUser,updateUser,deleteUser,userLogin};