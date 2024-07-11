const express =require('express')
const router = express.Router()
const { 
    createTask,
    getSingleTask,
    updateTask,
    getAllTasks,
    deleteTask
    } = require('../controllers/task/index')

const {
    createTaskValidator ,
    getTaskValidator,
    getAllTaskValidator,
    updateTaskValidator,
    deleteTaskValidator
    } = require('../utils/validation/task.validator')

router.post('/',createTaskValidator ,createTask)
router.get('/', getAllTaskValidator,getAllTasks)


router.get('/get-single-task/:id',getTaskValidator ,getSingleTask)
router.patch('/update-task/:id',updateTaskValidator ,updateTask)
router.delete('/delete-task/:id', deleteTaskValidator,deleteTask)

module.exports =router 