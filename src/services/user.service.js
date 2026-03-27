import user from '../models/User.model.js'

const userCadastroService = (body) => user.create(body)
const findAllUsersService = () => user.find()
const findUsersByIdService = (id) => user.findById(id)
const updateUserService = (id,nome,username,email,senha,avatar,background) => user.findOneAndUpdate(
    {_id: id},
    {
        nome,
        username,
        email,
        senha,
        avatar,
        background
    })

const deleteUserService = (id)=>user.findOneAndDelete({_id: id})

const encontrarEmailService = (email)=>user.findOne({email: email})

export default {
    userCadastroService, 
    findAllUsersService,
    findUsersByIdService,
    updateUserService,
    deleteUserService,
    encontrarEmailService 
}