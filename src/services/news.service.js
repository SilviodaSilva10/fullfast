import { create } from '../controllers/news.controller.js'
import news from '../models/news.model.js'

export const createNews = (body)=>news.create(body)
export const findAllNews= (offset, limit)=> news.find().sort({_id: -1}).skip(offset).limit(limit).populate('user') 
export const newsCount = ()=>news.countDocuments()
export const topnewsService = ()=> news.findOne().sort({_id: -1}).populate('user')
export const findbyIdService= (id)=>news.findById(id).populate('user')
export const searchbytitleService = (title)=>news.find({
        title:{$regex: `${title || ""}`, $options:"i"}
    }).sort({_id: -1}).populate('user')

export const byUserService = (id) =>news.find({user: id}).sort({_id: -1}).populate('user')
export const updateService= (id,titulo,text,banner)=> news.findOneAndUpdate({_id:id},{titulo,text,banner}, {rawResult:true})
export const deletePostService = (id)=>news.findOneAndDelete({_id: id})
export const likeNewsService = (id, userId)=>news.findOneAndUpdate(
        {
            _id: id,"likes.userId":{$nin: [userId]}
        },{
            $push: {
                likes:{
                    userId, 
                    created: new Date()
                }
            }
        }
    )
    
export const deletelikenewsService  = (id, userId)=>news.findOneAndUpdate(
        {_id: id},{ $pull: { likes:{userId} } }
    )  

export const addcommentService = async (id,userId, comment)=>{
    let idComment = Math.floor(Date.now() * Math.random()).toString(36)
    return news.findOneAndUpdate({_id: id},{
        $push:{
            coments:{
                idComment,userId,comment,created: new Date()
            }
        }        
    })}


export const deleterCommentService = async (idNews, idComment, userId) => {
    const result = await news.findOneAndUpdate(
        {
            _id: idNews,
            "coments.idComment": idComment,
            "coments.userId": userId
        },
        {
            $pull: {
                coments: { idComment }
            }
        },
        { returnDocument: 'after' } // retorna já atualizado
    );

    return result;
};