const express=require('express');
const { createOrder, veriFyPayment, createReceipt } = require('../controllers/payement.controller');

const router=express.Router();


router.post('/createOrder',createOrder);
router.post('/verifyPayment',veriFyPayment);
router.post('/paymentReceipt',createReceipt);

module.exports=router;