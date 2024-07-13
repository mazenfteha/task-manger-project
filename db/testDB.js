const mongoose = require('mongoose');
require('dotenv').config()
const connectTestDB = async () => {
    mongoose
    .connect(process.env.MONGO_TEST_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true,
    })
    .then((conn) => {
        console.log(`Database connected: ${conn.connection.host}`);
    }).catch(() => {
        console.log('Error while connecting to MongoDB',error.message);
        process.exit(1);
    })
};

// Function to disconnect from MongoDB
const disconnectTestDB = async () => {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB test database');
};

const clearTestDB = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
};

module.exports = { connectTestDB, disconnectTestDB, clearTestDB };