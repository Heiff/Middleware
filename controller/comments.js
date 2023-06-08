const Io = require('../Io')
const Model = require('../models/commentsModel')
const Data = new Io('./database/comment.json')



const getAllComment = async(req,res) => {
    const data = await Data.Read()
    res.status(200).json(data)
}


const PostComment = async (req,res) => {
    const { name,email,phone,message } = req.body;
    const data = await Data.Read()

    if (data.length == 0) {
        const newModel = new Model(
            name,
            email,
            phone,
            message
        )
         await Data.Write([newModel])
    }

  else if(data.length > 0){
    const newModel = new Model(
        name,
        email,
        phone,
        message
    )
     data.push(newModel)
     await Data.Write(data)
  }

}




const DeleteComment = async (req,res) => {
    const {id} = req.params;
    const data = await Data.Read();
    const DataFilter = data.filter((el) => el.id != id)
    await Data.Write(DataFilter)
    res.status(200).json('succes deleting')
}


module.exports = {
    getAllComment,
    DeleteComment,
    PostComment
}