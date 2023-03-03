const express =require('express');
const app =express();
const tasks =require('./routes/tasks')

//router
app.get('/hello', (req,res)=>{
    res.send("Task Manger App")
})

app.use('/api/v1/tasks',tasks)

const port = 8081 ;
app.listen(port, console.log(`Server is listen on port ${port}`));