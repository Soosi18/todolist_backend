import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser
} from '../controllers/userController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", verifyToken, logoutUser);
router.get("/current", verifyToken, getCurrentUser)

export default router;