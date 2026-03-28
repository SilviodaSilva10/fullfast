import dados from '../services/news.service.js'


export const create = async (req,res)=>{
    try{
        const{title, text, banner}=req.body

        if(!title || !text || !banner){
            return res.status(400).send({message: 'Preencha todos os Campos'})
        }
 
        const news = await dados.create({
            title,
            text,
            banner,
            user:req.userId 
        })

        if(!news){
            return res.status(400).send({message: 'Erro ao postar'})
        }

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
