import express from 'express'
import { GoogleUserLogin, UserLogin, UserRegister } from '../controllers/authController.js';
import { GoogleProtect } from '../middlewares/googleMiddleware.js';

const router = express.Router()

router.post("/register" , UserRegister);
router.post("/login" , UserLogin);
router.post("/googleLogin", GoogleProtect, GoogleUserLogin);

export default router;