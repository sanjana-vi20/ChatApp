import express from 'express'
import { GoogleUserLogin, UserLogin, UserLogout, UserRegister } from '../controllers/authController.js';
import { GoogleProtect } from '../middlewares/googleMiddleware.js';

const router = express.Router()

router.post("/register" , UserRegister);
router.post("/login" , UserLogin);
router.get("/logout" , UserLogout);
router.post("/googleLogin", GoogleProtect, GoogleUserLogin);

export default router;