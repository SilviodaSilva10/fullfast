const router = require('express').Router()
const userController = require('../controllers/user.controller')

router.post('/', userController.cadastro)
router.get('/',userController.findAll)
router.get('/:id', userController.findUserById)
router.patch('/:id', userController.update)
router.delete('/:id', userController.deleteUser)

module.exports = router 