const mongoose = require('mongoose')
require('dotenv').config()

// const mongoURL = process.env.MONGODB_LOCAL;  //For MongoDB local database
const mongoURL = process.env.MONGODB_URL;       //For MongoDB cloud database


mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected',()=>{
    console.log("Connected to MongoDB");
})

db.on('error',(err)=>{
    console.log("MongoDB Connection Error", err);
})
db.on('disconnected',()=>{
    console.log("MongoDB Disconnected");
})


module.exports= db;