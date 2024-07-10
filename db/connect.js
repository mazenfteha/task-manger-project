const mongoose =require('mongoose')

const connectionString =''

const connectDB =(url) =>{
return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true,
}).then(() => {
    console.log('Successfully connected')
}).catch(err => console.log(err));
}

module.exports =connectDB

