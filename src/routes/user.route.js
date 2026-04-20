import {Router}from 'express'
import userController from '../controllers/user.controller.js'

const router =Router()


import {validId,validUser} from  '../middlewares/global.middlewares.js'

router.post('/create', userController.cadastro)
router.get('/',userController.findAll)
router.get('/findById/:id', validId,validUser, userController.findUserById)
router.patch('/update/:id',  validId,validUser, userController.update)
router.delete('/:id', validId,validUser, userController.deleteUser)

export default router  