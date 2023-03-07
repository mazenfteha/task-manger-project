const express =require('express');
const app =express();
const tasks =require('./routes/tasks')
const connecDB = require('./db/connect')
require('dotenv').config()


//middleware
app.use(express.json())

//router
app.get('/hello', (req,res)=>{
    res.send("Task Manger App")
})

app.use('/api/v1/tasks',tasks)

const port = 8081 ;


const start =async ()=>{
    try {
        await connecDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listen on port ${port}`));
    } catch (error) {
        console.log(error)
    }
}


start()