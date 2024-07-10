const Task = require('../../models/task')
const asyncWrapper = require('../../middleware/async')

const getSingleTask = asyncWrapper(async (req, res, next) => {

    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })

    if (!task) {
            return res.status(404).json({ msg: `No task with id ${taskID}` })
    }
    res.status(200).json({ task })
})

module.exports = {
    getSingleTask
}