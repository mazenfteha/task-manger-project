const Task = require('../../models/task')
const asyncHandler = require('express-async-handler')


const createTask = asyncHandler(async (req, res) => {
    const { name } = req.body
    const task = await Task.create({name : name})
    res.status(201).json({ success: true, data: task})
})

module.exports = {
    createTask
}