const mongoose=require('mongoose');

const DB_NAME=require('../constants');


require('dotenv').config();

const connectDb=async()=>{

   
    try{

        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log('MongoDb instance ready');
    }catch(error){

        console.log("MongoDb  error ",error);
    }
}

module.exports=connectDb;