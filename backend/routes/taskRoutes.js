import express from 'express';
import Task from '../models/Task.js';
const router = express.Router()
//get all tasks
router.get("/",async(req,res)=>{
    const tasks = await Task.find()
    res.json(tasks)
})
//add new task
router.post("/",async(req,res)=>{
     const {title,completed} = req.body  
        const newTask = new Task({title,completed})
        await newTask.save()
        res.json(newTask)
})
//complete or not complete task
router.put("/:id",async(req,res)=>{
    const task = await Task.findById(req.params.id)
    task.completed = !task.completed
    await task.save()
    res.json(task)
})

//Delete task
router.delete("/:id",async (req,res)=>{
    await Task.findByIdAndDelete(req.params.id)
    res.json({msg:"Task Deleted"})
})
export default router;