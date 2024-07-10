const Task = require('../../models/task')
const asyncWrapper = require('../../middleware/async')

const getAllTasks = asyncWrapper(async (req, res) => {

    const tasks = await Task.find({})
    res.status(200).json({ tasks })

})

module.exports = {
    getAllTasks
}