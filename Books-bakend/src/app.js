const express=require('express');
const app=express();

const cors=require('cors');

require('dotenv').config();

app.use(cors());
app.use(express.json())


app.use(express.urlencoded({ extended: true }));


//Import Routes

const userRouter=require('./routes/user.routes')
const cartRouter=require('./routes/cart.routes')
const paymentRouter=require('./routes/payments.routes')
const avatarRouter=require('./routes/avatar.routes');

//Routes declaration


app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/payment',paymentRouter)
app.use('/api/avatar',avatarRouter)


module.exports=app;
