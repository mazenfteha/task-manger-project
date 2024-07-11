const tasks = require('../routes/task.routes')
const {errorHandler , notFound} =require('../middleware/errorHandler')


module.exports = (app) => {
    app.use('/api/v1/tasks',tasks)
    app.use(notFound);
    app.use(errorHandler);
}