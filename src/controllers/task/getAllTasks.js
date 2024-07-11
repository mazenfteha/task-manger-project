const Task = require('../../models/task')
const asyncHandler = require('express-async-handler')

const getAllTasks = asyncHandler(async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [tasks, totalTasks] = await Promise.all([
        Task.find({}).skip(skip).limit(limit),
        Task.countDocuments({})
    ]);

    const totalPages = Math.ceil(totalTasks / limit);

    res.status(200).json({
        success: true,
        data: tasks,
        pagination: {
            page,
            limit,
            totalPages,
            totalTasks,
        }
    });
});


module.exports = {
    getAllTasks
}