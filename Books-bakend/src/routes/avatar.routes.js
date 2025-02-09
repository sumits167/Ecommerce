const express=require('express');
const { avatar} =require('../controllers/avatr.controller');


    const router=express.Router();

    router.get('/avatars',avatar);
   
    module.exports=router;