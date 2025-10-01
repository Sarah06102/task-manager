// Routes created by connecting to apis created in userController
import { Router } from 'express';
import { registerUser, loginUser, getUserInfo } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

// Initialize express router
const router = Router();

// Route to register user
router.post("/register", registerUser);

// Route to log user in
router.post("/login", loginUser);

// Route to get user info
router.get('/profile', protect, getUserInfo);

export default router;