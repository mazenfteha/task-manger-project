const Task = require('../../models/task')
const APIError = require('../../utils/APIError')
const asyncHandler = require('express-async-handler')

const deleteTask = asyncHandler(async (req, res) => {

    const { id: taskID } = req.params

    if (!/^[0-9a-fA-F]{24}$/.test(taskID)) {
        return next(new APIError(`Invalid task ID format: ${taskID}`, 400));
    }

    const task = await Task.findByIdAndDelete({ _id: taskID })
    if (!task) {
        return next(new APIError(`No task with id ${taskID}`, 404));
    }
    res.status(200).json({ task })
})

module.exports = {
    deleteTask
}