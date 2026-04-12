import { Router } from "express";   
const router = Router()

import {create,findAll, topnews,findbyId, searchbytitle, byuser, update} from "../controllers/news.controller.js"; 
import {validId, validOwner,validEdit} from '../middlewares/global.middlewares.js'
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.post('/',authMiddleware,create)
router.get('/', findAll)
router.get('/top', topnews)
router.get('/search', searchbytitle)
router.get('/byuser',authMiddleware,byuser)

router.patch('/:id', authMiddleware,validId,validOwner,validEdit,update)

router.get('/:id', authMiddleware ,findbyId)

export default router

