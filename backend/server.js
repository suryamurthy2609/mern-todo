import express from 'express'
import mongoose from 'mongoose' 
import dotenv from'dotenv';
import cors from 'cors';
import  taskroutes from './routes/taskRoutes.js'
dotenv.config()
const app =express()
app.use(cors())
app.use(express.json())
app.use("/api/tasks", taskroutes)
mongoose.connect(process.env.MONGO_URI).then(()=>console.log("mongodb connected"))
.catch((err)=>{console.log(err)})
const port = process.env.PORT || 5000
app.listen(port,()=>{console.log(`server is running on port ${port}`)})