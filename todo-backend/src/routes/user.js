import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser
} from '../controllers/userController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", verifyToken, logoutUser);

export default router;