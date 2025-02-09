

const {createRazorpayInstance}=require('./config/razorpay.config');

const razorpayInstance=createRazorpayInstance();
const crypto=require('crypto');

exports.createOrder=async(req,res)=>{

const {amount}=req.body;

const options={
    amount:amount*100,
    currency:"INR",
    receipt:"receipt_order_1",
}



    try {

        razorpayInstance.orders.create(options,(err,order)=>{
            if(err){
                return res.status(500).json({
                    success:false,
                    msg:"Something went wrong"
                })
            }
            return res.status(200).json(order);
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            msg:"Somthing went wrong from catch"
        })
    }

}

exports.veriFyPayment=async(req,res)=>{

    const {order_id,payment_id,signature,userId}=req.body;

    const secret=process.env.RAZORPAY_KEY_SECRET;

    //create hmacObject

    const hmac=crypto.createHmac('sha256',secret);
    hmac.update(order_id+"|"+payment_id);

    const genratedSignature=hmac.digest('hex');


    if(genratedSignature==signature){
        

            //DO IT LATER
    // let result=await User.updateOne(
    //     {_id:userId},
    //     {$push:{orderHistory:}}
    // )

        return res.status(200).json({
            re:true,
            msg:"Payment Verified"
        })

    }else{

        return res.status(500).json({
            re:false,
            msg:"Payment not Verified"
        })
    }

}


exports.createReceipt=async(req,res)=>{

    const {payment_id,userId}=req.body;

    const paymentDetails=await razorpayInstance.payments.fetch(payment_id);

    console.log('paymentDetails====',paymentDetails)
    const receipt={
        id:paymentDetails.id,
        entity:paymentDetails.entity,
        currency:paymentDetails.currency,
        amount:paymentDetails.amount,
        status:paymentDetails.status,
        order_id:paymentDetails.order_id,
        international:paymentDetails.international,
        method:paymentDetails.method,
        amount_refunded:paymentDetails.amount_refunded,
        description:paymentDetails.description,
        wallet:paymentDetails.wallet,
        email:paymentDetails.email,
        contact:paymentDetails.contact,
        notes:paymentDetails.notes,
        date: new Date(paymentDetails.created_at * 1000).toLocaleString(),
        fee:paymentDetails.fee,
        tax:paymentDetails.tax
    }

    console.log("PaymentDetails=",receipt);



    res.json(receipt);

}