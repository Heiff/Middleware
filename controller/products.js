const Io = require('../Io')
const Data = new Io('./database/products.json')
const Model = require('../models/productsModel')
const {v4:uuid} = require('uuid')


const getAllProducts = async(req,res) => {
    const data = await Data.Read()
    res.status(200).json(data)
}




const postProducts = async (req,res) => {
    const { title,price } = req.body;
    const { image } = req.files
    const data = await Data.Read()
    const id = (data[data.length - 1]?.id || 0) + 1;

    const imageName = `${uuid()}.${
      image.name.split(".")[image.name.split(".").length - 1]
    }`;
    image.mv(process.cwd() + `/images/${imageName}`);
    let yes = true
    if (data.length === 0) {
      const newData = new Model(
        id,
        imageName,
        title,
        price
    )
    await Data.Write([newData])
    res.status(201).json({message:'Post success'})
    }
     
  for(let i = 0; i < data.length; i++)
  {
    if(data[i].title === title)
    {
      yes = false
      res.status(200).json({message:'bunday kitob bor'})
    }
  }
  if(yes)
  {
    const newData = new Model(
     id,
     imageName,
     title,
     price
    )
      
    data.push(newData);
    await Data.Write(data);
    res.status(200).json({message:'Post success'})
  }
}


const updateProducts = async (req,res) => {
    const data = Data.Read()
    const { image } = req.files;
    const { id,title,price } = req.body;
    const imageName = `${uuid()}.${
        image.name.split(".")[image.name.split(".").length - 1]
      }`;
      image.mv(process.cwd() + `/images/${imageName}`);
    const userid = data[id - 1];
   
    
        image ? (userid.image = imageName) : userid.image
        title ? (userid.title = title) : userid.title
        price ? (userid.price = price) : userid.price
        await Data.Write(data)
 
    res.status(201).json({PUT:data})
} 

const DeleteProduct = async (req,res) => {
    const {id} = req.params;
    const data = await Data.Read();
    const DataFilter = data.filter((el) => el.id != id)
    await Data.Write(DataFilter)
    res.status(200).json('succes deleting')
}


module.exports = {
    getAllProducts,
    postProducts,
    updateProducts,
    DeleteProduct
}