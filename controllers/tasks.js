const Task =require('../models/Task')

const getAllTasks = (req,res)=>{
    res.send('all items form controllers')
}

//create task
const createTask = async (req,res)=>{
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task })

    } catch (error) {
        res.status(500).json({msg:error})
    }

}

//get single task
const getTask = (req, res) => {
    res.json({id:req.params.id})
}

//update task
const updateTask = (req,res)=>{
    res.send('update task')
}

//delete task
const deleteTask = (req,res)=>{
    res.send('delete task')
}
module.exports={
    getAllTasks,createTask , getTask ,updateTask , deleteTask ,
}