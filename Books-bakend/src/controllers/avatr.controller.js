const mongoose=require('mongoose');

const Avatar=require('../models/avatar.model');




const avatar=async(req,res)=>{
    try {
        let result=await Avatar.find();
       
        res.json({result});
    } catch (error) {
        res.json(error)
       
    }
}





module.exports={
    avatar,
    

}