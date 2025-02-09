

const connectDb=require('./src/db/index.js');
const app=require('./src/app.js');

require('dotenv').config();

connectDb()
.then(()=>{

  
    app.listen(process.env.PORT||3000,()=>{
        console.log(`Server is running on port=${process.env.PORT||3000}`);
    })
})
.catch((err)=>{
    console.log("MongoDb connection is failed",err);
})
