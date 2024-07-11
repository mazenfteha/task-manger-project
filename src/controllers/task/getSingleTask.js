const Task = require('../../models/task')
const asyncHandler = require('express-async-handler')
const APIError = require('../../utils/APIError')
const getSingleTask = asyncHandler(async (req, res, next) => {

    const { id: taskID } = req.params

    if (!/^[0-9a-fA-F]{24}$/.test(taskID)) {
        return next(new APIError(`Invalid task ID format: ${taskID}`, 400));
    }

        const task = await Task.findById(taskID);

        if (!task) {
            return next(new APIError(`Task not found with ID: ${taskID}`, 404));
        }

        res.status(200).json({ success: true, data: task });
})

module.exports = {
    getSingleTask
}