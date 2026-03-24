const router = require('express').Router()
const userController = require('../controllers/user.controller')


const {validId,validUser} = require('../middlewares/global.middlewares')

router.post('/', userController.cadastro)
router.get('/',userController.findAll)
router.get('/:id', validId, userController.findUserById)
router.patch('/:id', validId, userController.update)
router.delete('/:id', validId, userController.deleteUser)

module.exports = router 