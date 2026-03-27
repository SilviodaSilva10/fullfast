import express from 'express'
import userController from '../controllers/user.controller.js'

const router = express.Router()


import {validId,validUser} from  '../middlewares/global.middlewares.js'

router.post('/', userController.cadastro)
router.get('/',userController.findAll)
router.get('/:id', validId,validUser, userController.findUserById)
router.patch('/:id',  validId,validUser, userController.update)
router.delete('/:id', validId,validUser, userController.deleteUser)

export default router  