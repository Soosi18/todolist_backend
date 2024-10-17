import bcrypt from 'bcryptjs';
import * as db from '../db/prisma_queries.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

export const loginUser = async(req, res) => {
  const failMessage = "Failed to login due to incorrect credentials";
  const foundUser = await db.getUser(req.body.username);

  if (foundUser){
    const match = await bcrypt.compare(req.body.password, foundUser.password);
    if (match){
      const loginToken = jwt.sign({
        user_id: foundUser.user_id,
        username: foundUser.username
      }, process.env.SECRET_KEY);
      res.cookie('auth', loginToken, {httpOnly: true, maxAge: 1000 * 60 * 30});
      res.json({success: true, username: req.body.username, message: "Successfully logged in!"});
    }
    else
      res.status(401).json({success: false, message: failMessage});
  }
  else{
    res.status(401).json({success: false, message: failMessage});
  }
}

export const registerUser = asyncHandler(async(req, res) => {
  const username = req.body.username;
  const foundUser = await db.getUser(username);
  if(!foundUser){
    const password = await bcrypt.hash(req.body.password, 10);
    await db.addNewUser(username, password);
    res.json({success: true, message: "Successfully registered!"});
  }
  else {
    res.status(409).json({success: false, message: "Username already taken"});
  }
});

export const logoutUser = async(req, res) => {
  res.clearCookie("auth");
  res.json({success: true, message: "Successfully logged out!"});
}

export const getCurrentUser = async(req, res) => {
  res.json({success: true, username: req.user.username});
}