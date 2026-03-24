const mongoose = require('mongoose')
const dados = require('../services/user.service')

const cadastro = async(req,res)=>{
    const {nome,email,telefone,senha}=req.body

    if(!nome||!email||!telefone||!senha){
        res.status(400).send({message: "Preencha todos os campos"})
    }

    const user = await dados.userCadastroService(req.body)

    if(user.email === email ){
        return res.status(400).send({messaeg: 'E-mail já cadastrado'})
    }

    if(!user){
       return res.status(400).send({message: 'Erro ao cadastrar'})
    }
    
    res.status(200).send({message:"Cadastrao com sucesso"})    

}


const findAll = async (req,res)=>{
    const users = await dados.findAllUsersService()

    if (users.length === 0){
        return res.status(400).send({message: 'Não há users cadastrado'})
    }
    res.json(users)

}

const findUserById = async (req,res) => {
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({message: 'Id invalido'})
    }
    const user = await dados.findUsersByIdService(id)

   

    if(!user){
        return res.status(400).send({message: 'Usuario não encontrado'})
    }

    res.status(200).json(user)
}

const update = async(req,res)=>{
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(400).send({message: 'Id não valido'})
    }
    
    const {nome,email,telefone,senha} = req.body

    if(!nome && !email && !telefone && !senha){
        res.status(400).send({message: "Preencha todos os campos"})
    }
    
    const user = await dados.findUsersByIdService(id)
    if (!user){
        return res.status(400).send({message: 'O user não encontrado'})
    }

    await dados.updateUserService(id,nome,email,telefone,senha)

    res.send({message: 'User atualizado com sucesso'})
}

const deleteUser = async (req,res)=>{
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({message: 'O id não é valido'})
    }

    const user = await dados.findUsersByIdService(id)
    if(!user){
        return res.status.send({message: 'User não encontrado'})
    }

    await dados.deleteUserService(id)

    res.status(200).send({message: 'User elimido com sucesso'})
}

module.exports = {
    cadastro, findAll,findUserById, update,deleteUser
}