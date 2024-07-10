const express =require('express')
const router = express.Router()
const { 
    createTask,
    getSingleTask,
    updateTask,
    getAllTasks,
    deleteTask
    } = require('../controllers/task/index')


router.route('/')
    .get(getAllTasks)
    .post(createTask);

router.route('/:id')
    .get(getSingleTask)
    .patch(updateTask)
    .delete(deleteTask);


module.exports =router 