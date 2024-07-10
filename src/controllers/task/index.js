const { createTask } = require('./createTask')
const { getSingleTask} = require('./getSingleTask')
const { updateTask } = require('./updateTask')
const { getAllTasks } = require('./getAllTasks')
const { deleteTask } = require('./deleteTask')


module.exports = {
    createTask,
    getSingleTask,
    updateTask,
    getAllTasks,
    deleteTask
}