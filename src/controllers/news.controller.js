import mongoose from 'mongoose'
import * as dados from '../services/news.service.js'

export const create = async (req,res)=>{
    try{
        const{title, text, banner}=req.body

        if(!title || !text || !banner){
            return res.status(400).send({message: 'Preencha todos os Campos'})
        }
 
        const news = await dados.createNews({
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
        return res.status(500).send({message: err.message})
     }
}

export const findAll = async (req,res)=>{
    try {
        let limit = Number(req.query.limit) || 5
        let offset = Number(req.query.offset) || 0
        

        const news = await dados.findAllNews(offset, limit) 
        const total = await dados.newsCount()
        const currentUrl = req.baseUrl


        const next = offset + limit
        const nextUrl = next < total 
        ?`${currentUrl}?limit=${limit}&offset=${next}`
        :null

        const previous = offset - limit<0 ? null : offset-limit
        const previousUrl = previous !== null ? `${currentUrl}?limit=${limit}&offset=${previous}`:null


        if(news.length === 0){
            return res.status(400).send({message: 'Não há publicaçoes de momento'})
        }

        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
            results: news.map((newsItem)=>({
                id: newsItem._id,
                title: newsItem.title,
                text: newsItem.text,
                banner: newsItem.banner,
                likes: newsItem.likes,
                comments: newsItem.coments,
                name: newsItem.user.nome,
                username: newsItem.user.username,
                userAvatar: newsItem.user.avatar

            }))
        })
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
}

export const topnews = async (req,res)=>{
    try {
        const news = await dados.topnewsService()

        if(!news){
            res.status(400).send({message: 'Não publicações registadas'})
        }

        res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.coments,
                name: news.user.nome,
                username: news.user.username,
                userAvatar: news.user.avatar
            }
    })

    } catch (err) {
        return res.status(500).send({message: err})
    }

}

export const findbyId = async (req,res)=>{
    try {
        const id = req.id

        const news = await dados.findbyIdService(id)

        if(!news){
            return res.status(400).send({message: 'Not found'})
        }

        res.send({
         news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.coments,
                name: news.user.nome,
                username: news.user.username,
                userAvatar: news.user.avatar
            }   
        })
    } catch (err) {
        return res.status(500).send({message: err.message})
    }
} 

export const searchbytitle = async (req,res)=>{
    try{
        const {title} = req.query;

        const news = await dados.searchbytitleService(title)

        console.log(news)

        if(news.length === 0){
            return res
            .status(400)
            .send({message: 'not found'})
        }


        return res.send({
            results: news.map((newsItem)=>({
                id: newsItem._id,
                title: newsItem.title,
                text: newsItem.text,
                banner: newsItem.banner,
                likes: newsItem.likes,
                comments: newsItem.coments,
                name: newsItem.user.nome,
                username: newsItem.user.username,
                userAvatar: newsItem.user.avatar

            }))            
        })
    }catch(err){
        return res.status(500).send({message: err})
    }

}

export const byuser = async(req,res)=>{
    try{
        const id = req.userId
        const news = await dados.byUserService(id)

        if(!news || news.length === 0){
            return res.status(400).send({message: 'Not found'})
        }

        res.send({
                results: news.map((newsItem)=>({
                    id: newsItem._id,
                    title: newsItem.title,
                    text: newsItem.text,
                    banner: newsItem.banner,
                    likes: newsItem.likes,
                    comments: newsItem.coments,
                    name: newsItem.user.nome,
                    username: newsItem.user.username,
                    userAvatar: newsItem.user.avatar
                }))
            })
    }catch(err){
        return res.status(500).send({message: err})
    }
}

export const update = async(req,res)=>{
   
    const {titulo,text,banner} = req.postEdit 

    const news = await dados.updateService(req.postId,titulo,text,banner)
    if(!news){
        return res.status(400).send({message: 'Erro ao editar'})
    }

    res.send({
        message: 'Upadate sucessfull',
        titulo,
        text,
        banner
    })
}

export const deletePost = async(req,res)=>{
    const id = req.id
    const deleter = await dados.deletePostService(id)
    
    if(!deleter){
        return res.status(400).send({message: 'erro ao deletar'})
    }
    
    res.send({message: 'deletado'})
}

export const likeNews = async (req,res)=>{
    try {
        const id = req.id
        const userId = req.userId
      
        const newsliked = await dados.likeNewsService(id, userId)

        if(!newsliked){
            await dados.deletelikenewsService(id, userId)
            return res.send({message: 'like removido'})
        }
        
        return res.send({message: 'ok'})


    } catch (err) {
        return res.status(500).send({message: err.message})
    }
}

export const comments = async(req,res)=>{
    try {
        const id = req.id
        const userId = req.userId
        const {comment} = req.body

        const commenter = await dados.addcommentService(id, userId, comment)

        if(!commenter){
            return res.status(400).send({message: 'Erro ao comentar'})
        }       

        return res.send({message: 'sucessefull'})
    } catch (err) {
        return res.status(500).send({message: err.message})
        
    }
}
export const deleteComments = async (req, res) => {
    try {
        const { idNews, idComment } = req.params;
        const userId = req.userId;

        const result = await dados.deleterCommentService(idNews, idComment, userId);

        if (!result) {
            return res.status(404).send({
                message: 'Comentário não encontrado ou não tens permissão'
            });
        }

        return res.send({
            message: 'Comentário deletado com sucesso'
        });

    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};