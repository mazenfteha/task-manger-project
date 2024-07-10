const Task = require('../../models/task')
const asyncWrapper = require('../../middleware/async')

const updateTask = asyncWrapper(async (req, res) => {

    const { id: taskID } = req.params

    const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
            new: true,
            runValidators: true,
    })
    res.status(200).json({ task })
})

module.exports = {
    updateTask
}