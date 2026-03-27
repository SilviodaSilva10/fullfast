import dados from '../services/user.service.js'
import bcrypt from 'bcrypt'
const cadastro = async(req,res)=>{
    try{
        const {nome,username,email,password,avatar,background}=req.body
        

        if(!nome || !username || !email || !password || !avatar || !background){
            res.status(400).send({message: "Preencha todos os campos"})
        }

        const textEmail = await dados.encontrarEmailService(email)

        if(textEmail){
            return res.status(400).send({message: 'E-mail já esta cadastrado'})
        }
        const user = await dados.userCadastroService(req.body)

        if(!user){
        return res.status(400).send({message: 'Erro ao cadastrar'})
        }
        
        res.status(200).send({message:"Cadastrao com sucesso"})    
    }
    catch(err){
        res.status(500).send({message: err.message})
    }
}

const findAll = async (req,res)=>{
    try{
    const users = await dados.findAllUsersService()

    if (users.length === 0){
        return res.status(400).send({message: 'Não há users cadastrado'})
    }
    res.json(users)
    }catch(err){
        res.status(500).send({message: err.message})
    }
}

const findUserById = async (req,res) => {
   try{ 
    res.status(200).json(req.user)
   }catch(err){
    res.status(500).send({message: err.message})
   }
}

const update = async(req,res)=>{
    try{
        const {nome,username,email,senha,avatar,background} = req.body

        if(!nome &&  !username && !email && !senha && !avatar && !background){
            res.status(400).send({message: "Preencha todos os campos"})
        }
        
        await dados.updateUserService(req.id,nome,username,email,senha,avatar,background)

        res.send({message: 'User atualizado com sucesso'})
    }catch(err){
        res.status(500).send({message: err.message})
    }
}

const deleteUser = async (req,res)=>{
    try{
        await dados.deleteUserService(req.id)

        res.status(200).send({message: 'User elimido com sucesso'})
      }
      catch(err){
        res.status(500).send({message: err.message})
      }    
}

export  default {
    cadastro, findAll,findUserById, update,deleteUser
}