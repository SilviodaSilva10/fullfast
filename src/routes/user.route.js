const router = require('express').Router()
const userController = require('../controllers/user.controller')


const {validId,validUser} = require('../middlewares/global.middlewares')

router.post('/', userController.cadastro)
router.get('/',userController.findAll)
router.get('/:id', validId,validUser, userController.findUserById)
router.patch('/:id', validId,validUser, userController.update)
router.delete('/:id', validId,validUser, userController.deleteUser)

module.exports = router 