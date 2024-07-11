const { query ,check } = require('express-validator')
const { validationMiddleware } = require('../../middleware/validation.middleware')

const createTaskValidator = [
    check("name")
        .isString()
        .notEmpty()
        .withMessage('You sholud write the name of task')
        .isLength({max : 20})
        .withMessage('name can not be more than 20 characters'),
    validationMiddleware
];

const getTaskValidator = [
    check('id').isMongoId().withMessage('task id should be an Mongo object id'),
    validationMiddleware
];

const getAllTaskValidator = [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be an integer greater than 0'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be an integer greater than 0'),
]

const updateTaskValidator = [
    check('id').isMongoId().withMessage('task id should be an Mongo object id'),
    check("name")
        .isString()
        .withMessage('name of task should be string')
        .optional()
        .isLength({max : 20})
        .withMessage('name can not be more than 20 characters'),
    check("completed")
        .isBoolean()
        .withMessage('completed should be a boolean')
        .optional(),
    validationMiddleware
];

const deleteTaskValidator = [
    check('id').isMongoId().withMessage('task id should be an Mongo object id'),
    validationMiddleware
];


module.exports = {
    createTaskValidator,
    getTaskValidator,
    getAllTaskValidator,
    updateTaskValidator,
    deleteTaskValidator
}