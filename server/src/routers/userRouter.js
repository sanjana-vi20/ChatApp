import express from 'express'
import { fetchAllContacts } from '../controllers/userController.js';

const router = express.Router();

router.get("/fetch-all-contacts" , fetchAllContacts);

export default router;