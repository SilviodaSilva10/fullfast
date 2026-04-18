import { Router } from "express";   
const router = Router()

import {
    create,
    findAll, 
    topnews,
    findbyId, 
    searchbytitle, 
    byuser, 
    update,
    deletePost,
    likeNews,
    comments,
    deleteComments
} from "../controllers/news.controller.js"; 

import {validId, validOwner,validEdit,validUser} from '../middlewares/global.middlewares.js'
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.post('/create',authMiddleware,create)
router.get('/', findAll)
router.get('/top', topnews)
router.get('/search', searchbytitle)
router.get('/byuser',authMiddleware,byuser)
router.patch('/:id', authMiddleware,validId,validOwner,validEdit,update)
router.get('/:id', authMiddleware,validId ,findbyId)
router.delete('/:id',authMiddleware,validId,validOwner,deletePost)
router.patch('/like/:id', authMiddleware,validId, likeNews)
router.patch('/addcomente/:id',authMiddleware, validId, comments)
router.patch('/deletecomente/:idNews/:idComment', authMiddleware,deleteComments)
export default router
