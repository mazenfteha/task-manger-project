const getAllTasks = (req,res)=>{
    res.send('all items form controllers')
}

//create task
const createTask = (req,res)=>{
    res.json(req.body)
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