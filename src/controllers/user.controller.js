const dados = require('../services/user.service')

const cadastro = async(req,res)=>{
    try{
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
        const {nome,email,telefone,senha} = req.body

        if(!nome && !email && !telefone && !senha){
            res.status(400).send({message: "Preencha todos os campos"})
        }
        
        await dados.updateUserService(req.id,nome,email,telefone,senha)

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

module.exports = {
    cadastro, findAll,findUserById, update,deleteUser
}