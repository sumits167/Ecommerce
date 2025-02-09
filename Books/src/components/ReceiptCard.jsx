import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const ReceiptCard = () => {

const userId=useSelector((state)=>state.user.data.result[0]._id);


    const [orderDetails,setOrderDetails]=useState();
    const [money,setMoney]=useState();
    const [address,setAddress]=useState();
    const [receiptDetails,setReceiptDetails]=useState();

    useEffect(()=>{

        try {
            fetch('http://localhost:3000/api/user/getOrderHistory',{
                method:'post',
                headers:
                {'Content-type':'application/json'},
                body:
                JSON.stringify({
                    userId:userId
                })
            })
            .then((res)=>res.json())
            .then((data)=>{
             
                setReceiptDetails(data[0].lastOrder.receiptData);
                setAddress(data[0].lastOrder.address)
                setMoney(data[0].lastOrder.money);
                setOrderDetails(data[0].lastOrder.orderDetails);
            })
        } catch (error) {
            console.log(error);
        }

    },[])





  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      {/* Receipt Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Order Receipt</h1>
        <span className="text-gray-500 text-sm">Order_Id: {receiptDetails?receiptDetails.order_id:null}</span>
      </div>

      {/* Customer Information */}
{address?(
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Customer Details</h2>
        <p className="text-gray-600">Name: {address.name}</p>
        <p className="text-gray-600">Email: {address.email}</p>
        <p className="text-gray-600">Phone: (123) 456-7890</p>
      </div>):null
}
      {/* Order Details */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Order Details</h2>

{orderDetails?(
    orderDetails.map((el)=>(

        <div key={el.productId} className="space-y-2">

<div className="flex items-center justify-between py-2">
  {/* Image */}
  <img 
    src={el.Details.image} 
    alt="Product"
    className="w-16 h-16 object-cover mr-4" 
  />

  {/* Item name */}
  <span className="text-gray-600 text-sm flex-grow">
   {el.Details.title}
  </span>

  {/* Price */}
  <span className="text-gray-600 text-sm mr-4">
   {el.price}
  </span>

  {/* Quantity */}
  <span className="text-gray-600 text-sm">
   {el.quantity}
  </span>
</div>

          
        </div>
        ))
):null
}  

      </div>

      {/* Total Price */}
      {receiptDetails?(
      <div className="flex justify-between items-center border-t pt-4 mt-4">
        <h2 className="text-lg font-semibold text-gray-700">Total</h2>
        <span className="text-xl font-bold text-green-600">${receiptDetails.amount/100}</span>
      </div>
      ):null}

      {/* Payment Method */}
      {receiptDetails?(
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-700">Payment Details</h2>
        <p className="text-gray-600">Method: {receiptDetails.method}</p>
        <p className="text-gray-600">currency: {receiptDetails.currency}</p>
        <p className="text-gray-600">Order_id: {receiptDetails.order_id}</p>
        <p className="text-gray-600">Date : {receiptDetails.date}</p>
      </div>
):null
}
      {/* Order Status */}
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-500">Order placed successfully on December 19, 2024</span>
      </div>
    </div>
  );
};

export default ReceiptCard;
