const Task = require('../../models/task')
const asyncHandler = require('express-async-handler')

const deleteTask = asyncHandler(async (req, res) => {

    const { id: taskID } = req.params
    const task = await Task.findByIdAndDelete({ _id: taskID })
    if (!task) {
            return res.status(404).json({ msg: `No task with id ${taskID}` })
    }
    res.status(200).json({ task })
})

module.exports = {
    deleteTask
}