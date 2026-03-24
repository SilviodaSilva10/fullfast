const user = require('../models/User.model')

const userCadastroService = (body) => user.create(body)
const findAllUsersService = () => user.find()
const findUsersByIdService = (id) => user.findById(id)
const updateUserService = (id,nome,email,telefone,senha) => user.findOneAndUpdate(
    {_id: id},
    {
        nome,
        email,
        telefone,
        senha
    })

const deleteUserService = (id)=>user.findOneAndDelete({_id: id})

module.exports= {
    userCadastroService, 
    findAllUsersService,
    findUsersByIdService,
    updateUserService,
    deleteUserService
}