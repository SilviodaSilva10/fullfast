import { Router } from "express";   
const router = Router()

import {create,findAll, topnews,findbyId} from "../controllers/news.controller.js"; 
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.post('/',authMiddleware,create)
router.get('/',authMiddleware,findAll)
router.get('/top', topnews)
router.get('/:id', findbyId)
export default router

