const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080

const dotenv = require('dotenv').config();

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI).then(()=>{console.log('database connected')}).catch((e)=>console.log(e))

const cors = require('cors')
const options = {
    origin: ['http://localhost:3000','http://localhost:8080'],
    credentials: true
}
app.use(cors(options))

const path = require('path')

app.use(express.static(path.join(__dirname,'static')))
app.use(express.json())

const cookieParser = require('cookie-parser')
app.use(cookieParser())

// routes
const userRoutes = require('./routes/userRoutes')
app.use('/api/user',userRoutes)

const blogRoutes = require('./routes/blogRoutes')
app.use('/api/blog',blogRoutes)

//----------------------------------production build----------//
if(process.env.NODE_ENV === "production"){
app.use('/images',express.static(path.join(__dirname,'images')));
app.use(express.static(path.join(__dirname,'frontend/build')));
app.get('*', (req,res)=>{res.sendFile(path.join(__dirname, 'frontend/build/index.html'))});
} 

app.listen(PORT,()=>console.log(`server listening at ${PORT}`))