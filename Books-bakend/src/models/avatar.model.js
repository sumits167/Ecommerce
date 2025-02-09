const mongoose = require('mongoose');

const avatarSchema=new mongoose.Schema({
    url:{
        type:String
    }
})



module.exports=mongoose.model("avatars",avatarSchema);