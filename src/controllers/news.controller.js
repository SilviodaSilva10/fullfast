import dados from '../services/news.service.js'


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
/*
export const findAll = async (req,res)=>{
    try{
        const { offset, limit}=req.query
        
        if(!limit){
          return  limit = 5
        }

        if(!offset){
            return offset = 0
        }
        
        const news = await dados.findAllNews(offset,limit)
        const total =  await dados.newsCount()
        const currentUrl = req.baseUrl
        
        const next = limit + offset

        const nextUrl = next < total 
        ? `${currentUrl}?limit=${limit}&offset=${next}` 
        : null

        const previous = offset - limit < 0 
        ? null 
        : offset - limit

        const previousUrl = previous !== null ? `${currentUrl}?limit=${limit}&offset=${previous}`: null 

        if(news.length === 0){
            return res.status(400).send({message: 'não publicações disponivel no momento s925 ale'})
        }

        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,

            results: news.map(newsItem => ({
                id: newsItem,
                title: newsItem.title,
                text: newsItem.text,
                banner: newsItem.banner,
                likes: newsItem.likes,
                coments: newsItem.coments,
                name: newsItem.user.nome,
                username: newsItem.user.username,
                userAvatar: newsItem.user.avatar
            }))
        })
    }   
    catch(err){
        return res.status(500).send({message: err.message})
    } 
}
*/

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
        const {id} = req.params

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
        return res.status(500).send({message: err})
    }
} 