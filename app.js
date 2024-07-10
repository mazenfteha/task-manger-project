const express =require('express');
const app =express();
const tasks =require('./routes/tasks')
const connecDB = require('./db/connect')
require('dotenv-flow').config()
const notFound =require('./middleware/not-found')
const errorHandlerMiddleware =require('./middleware/error-handler')



//middleware
app.use(express.static('./public'))
app.use(express.json())

//router

app.use('/api/v1/tasks',tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

/*  REAT API :
app.get('/app/v1/tasks')   => get all tasks
app.post('/app/v1/tasks')  => create a new task
app.get('/app/v1/tasks/:id') => get single task
app.patch('/app/v1/tasks/:id') => upbadte task
app.delete('/app/v1/tasks/:id') => delete task
*/

const port = process.env.PORT || 8081 ;


const start =async ()=>{
    try {
        await connecDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listen on port ${port}`));
    } catch (error) {
        console.log(error)
    }
}


start()

module.exports = app;