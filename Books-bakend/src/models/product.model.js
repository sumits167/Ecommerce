const mongoose = require('mongoose');

const productSchema=new mongoose.Schema({
    title:{
        type:String
    },
    stock:{
        type:Number
    },
    review:{
        type:Array
    },
    reviewCount:{
    type:Number
},
discount:{
    type:Number
}
})


module.exports=mongoose.model("products",productSchema);