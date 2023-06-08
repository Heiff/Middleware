const express = require('express')
require('dotenv').config();
const app = express()
const productRouter = require('./router/productRouter')
const adminRouter = require('./router/adminRouter')
const commentsRouter = require('./router/commentsRouter')
const FileUpload = require('express-fileupload')


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/',productRouter)
app.use('/comments',commentsRouter)
app.use(express.static(`${process.cwd()}/images`));
app.use(FileUpload());
app.use('/',adminRouter)
const PORT = process.env.PORT

app.listen(PORT,()=>{
console.log(PORT);
})