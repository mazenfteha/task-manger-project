const express =require('express');
const app = express();
const connecDB = require('../db/connect')
require('dotenv-flow').config()
const appIndex = require('./hooks/index.hooks')
const appSetup = require('./utils/app.setup')



appSetup(app)
appIndex(app)


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