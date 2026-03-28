import dados from '../services/news.service.js'


export const create = async (req,res)=>{
    try{
        const {authorization} = req.headers
        const part = authorization.split('') 
        const[schema, token] = part
        
        if(!authorization){
            return res.send(401)
        }

        if(part.length !== 2){
            return res.status.send({message: '401'})
        }
        
        const{title, text, banner}=req.body

        if(!title || !text || !banner){
            return res.status(400).send({message: 'Preencha todos os Campos'})
        }

        const news = await dados.create({
            title,
            text,
            banner,
            user:'69c6cb06adf9e79d09ea374d'
        })

        if(!news){
            return res.status(400).send({message: 'Erro ao postar'})
        }

        console.log(authorization)

        
        res.status(201).send({message: 'Publicado com sucesso'})
     }catch(err){
        return res.status(500).send({message: err})
     }
}

export const findAll = async (req,res)=>{
    try{
        const news = await dados.findAll()

        if(news.length === 0){
            return res.status(400).send({message: 'não publicações disponivel no momento'})
        }

        res.send(news)
    }   
    catch(err){
        returnres.status(500).send({message: err})
    } 
}
