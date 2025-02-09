const express=require('express');


const { ratingsAndReview,
    search,
    usersUpdate,
    productUpdate,
books} =require('../controllers/cart.controller');

const router=express.Router();



router.post('/search',search);
router.post('/productUpdate',productUpdate);
router.post('/usersUpdate',usersUpdate);
router.post('/ratingsAndReview',ratingsAndReview);
router.post('/books',books);


module.exports=router;