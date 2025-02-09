const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({

    username:{
        type:String
    },
    password:{
        type:String
    },
    email:
    {
        type:String

    },
    phone:{
        type:Number
    },
    cartData:{
        type:Array
    },
    address:{
        type:Object
    },
    orderHistory:{
        type:Array
    },
    profileImageUrl:{
        type:String
    },
    searchHistory:{
        type:Array
    }

})


module.exports=mongoose.model("users",userSchema);