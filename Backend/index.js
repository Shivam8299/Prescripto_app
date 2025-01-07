import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongoDB.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'

const app = express()
const port = process.env.PORT || 3000
connectDb()
connectCloudinary()

// middlewares
app.use(express.json());
app.use(cors())

// end points

app.use('/api/admin',adminRouter);
// localhost:4000/api/admin/add-doctor


app.get('/', (req,res)=>{
    res.send('hello from server side')
})

app.listen(port, (error)=>{
    !error ? console.log(`server is runing on port ${port}`) : 
    console.log(error) 
    
})
