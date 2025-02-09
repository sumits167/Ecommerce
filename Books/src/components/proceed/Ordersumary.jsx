import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {quantityUpdate } from '../../store/cart';
import { toast } from 'react-toastify';
import { checkin} from '../../store/cart';

const Ordersumary = () => {

  let checking=0;
   const [money,setMoney]=useState(0);
   const [money2,setMoney2]=useState(0);

    const check=useSelector((state)=>state.cart.check);
   const [quantityCount,setquantityCount]=useState(1);

  const buyingDetails=useSelector((state)=>state.cart.buy);

  const [orderDetails,setOrderDetails]=useState([]);

  const user=useSelector((state)=>state.user.data);
  const [cartData,setCartData]=useState();
    const navigate=useNavigate();
    const data=useSelector((state)=>state.cart.data);
    const pay=useSelector((state)=>state.cart.topay);
    const address=useSelector((state)=>state.cart.address);
    const [payment,setPayment]=useState(pay);
    
    const dispatch=useDispatch();
   
    const [db,setDb]=useState();

    useEffect(()=>{
    if(buyingDetails.length==0){
      try {
        fetch('http://localhost:3000/api/user/detail',{
          method:"post",
          headers:
          {'Content-type':'application/json'},
          body:
          JSON.stringify({
            id:user.result[0]._id
          })
        })
        .then((res)=>res.json())
        .then((data)=>{
          setCartData(data);
        })
      } catch (error) {
        
      }
  }else{
    setCartData(buyingDetails);
  }
},[])

  useEffect(()=>{
if(buyingDetails.length==0){
  cartData?(
    cartData.map((product)=>{
      let discount=product.Details[0].discount?product.Details[0].price*product.Details[0].discount/100:0;
      setMoney2((prev)=>prev+=product.cartData.quantity*product.Details[0].price)
      setMoney((prev)=>prev+=product.cartData.quantity*(product.Details[0].price-discount))
    setOrderDetails((prev)=>
      [...prev,{
        price:product.Details[0].price*product.cartData. quantity,
        quantity:product.cartData. quantity,
        Details:product.Details[0],
        productId:product.cartData.productId,
      }]
  )
    })
  ):null
}else{
  setOrderDetails(
    [{
      price:buyingDetails[0].Details[0].price,
      quantity:quantityCount,
      Details:buyingDetails[0].Details[0],
      productId:buyingDetails[0].Details[0]._id,
    }]
)
if(check==0){
  setMoney(buyingDetails[0].Details[0].price-(buyingDetails[0].Details[0].price*buyingDetails[0].Details[0].discount/100));
  buyingDetails[0].Details[0].discount?setMoney2(buyingDetails[0].Details[0].price):null;
 dispatch(checkin("inc"))
}
}
},[cartData,quantityCount])

    const updateUser=async()=>{
      try {
         const response=await fetch("http://localhost:3000/api/payment/createOrder",{
          method:"post",
          headers:
          {'Content-type':'application/json'},
          body:
          JSON.stringify({
            amount:money
          })
         });
         const data=await response.json();
         const options={
          key: "rzp_test_Re0szKdA93kKdz", // Replace with your Razorpay test/live key
          amount:data.amount, // Amount in paise (1 INR = 100 paise)
          currency:data.currency,
          name: "Port",
          description: "Order description",
          image: "https://your-logo-url.com", // Your company logo
          order_id:data.id, // Razorpay order ID from backend,
          ...data,
          handler:async function(response){
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature }=response;
            let res=await fetch('http://localhost:3000/api/payment/verifyPayment',{
              method:"post",
              headers:
              {'Content-type':'application/json'},
              body:
             JSON.stringify({
              order_id:razorpay_order_id,
                payment_id:razorpay_payment_id,
                signature:razorpay_signature,
                userId:user.result[0]._id, 
             })
            });
            let data=await res.json();
            if(data.re){
              let res2=await fetch('http://localhost:3000/api/payment/paymentReceipt',{
                method:"post",
                headers:
                {"Content-type":"application/json"},
                body:
                JSON.stringify(
                  {
                    payment_id:razorpay_payment_id,
                    userId:user.result[0]._id, 
                  }
                )
              });
              let receiptData=await res2.json();
              let orderData={
                receiptData,
                orderDetails,
                money,
                address:cartData[0].address
              }
              if(receiptData){
                let result=await fetch('http://localhost:3000/api/user/orderHistory',{
                  method:"post",
                  headers:
                  {"Content-type":"application/json"},
                  body:
                  JSON.stringify(
                    {
                      id:user.result[0]._id, 
                      orderDetails:orderData
                    }
                  )
                });
                let resolvedData=await result.json();
              }
              toast("Order placed")
              navigate('/orderPlaced');
            }else{
            }
          },
          prefill: {
            name: "Customer Name",
            email: "customer@example.com",
            contact: "9876543210",
          },
          notes: {
            address: "Some address",
          },
          theme: {
            color: "#3399cc", // Customize the checkout modal color
          },
         }
         const rzp1=new window.Razorpay(options);
         rzp1.open();// Open Razorpay payment modal
      } catch (error) {
      }
  const updataeproMise= cartData.map(async(el)=>{
   let stock=buyingDetails!=0?quantityCount:el.cartData.quantity;
       let res=await fetch('http://localhost:3000/api/cart/productUpdate',{
          method:"post",
          headers:
          {'Content-type':'application/json'},
          body:
          JSON.stringify({
            id:el.Details[0]._id, 
            stock:stock                        // BEFORE=>el.cartData.quantity
          })
        });
        let data=await res.json();
    })
    await Promise.all(updataeproMise);
    if(buyingDetails==0){
    let res=await fetch('http://localhost:3000/api/user/cartDataEmpty',{
          method:"post",
          headers:
          {'Content-type':'application/json'},
          body:
          JSON.stringify({
            id:user.result[0]._id, 
          })
        });
        let data=res.json();
    }
    }
    const productQuantityUpdate=(e,key)=>{
      if(e=="+"){
        setquantityCount((prev)=>prev+=1)
        if(buyingDetails[0].Details[0].discount){
          setMoney2((prev)=>prev+=buyingDetails[0].Details[0].price)
        }
        let discount=buyingDetails[0].Details[0].discount?buyingDetails[0].Details[0].price*buyingDetails[0].Details[0].discount/100:0;
        setMoney((prev)=>prev+=(buyingDetails[0].Details[0].price-discount));
      }else if(quantityCount!=1&&e=="-"){
        let discount=buyingDetails[0].Details[0].discount?buyingDetails[0].Details[0].price*buyingDetails[0].Details[0].discount/100:0;
        if(buyingDetails[0].Details[0].discount){
          setMoney2((prev)=>prev-=buyingDetails[0].Details[0].price)
        }
        setquantityCount((prev)=>prev-=1)
        setMoney((prev)=>prev-=(buyingDetails[0].Details[0].price-discount));
      }
    }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
    {/* //Address Section */}
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Shipping Address</h2>
      {/* Address Display */}
      <div className="space-y-6">
        {/* Full Name */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Full Name</span>
          <span className="text-sm text-gray-800">{address.name}</span>
        </div>
        {/* Email Address */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Email Address</span>
          <span className="text-sm text-gray-800">{address.email}</span>
        </div>
        {/* Address Line 1 */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Address Line 1</span>
          <span className="text-sm text-gray-800">{address.address}</span>
        </div>
        {/* Address Line 2 */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Address Line 2</span>
          <span className="text-sm text-gray-800">addressData.addressLine2</span>
        </div>
        {/* City and State Fields */}
        <div className="flex items-center justify-between">
          <div className="w-1/2">
            <span className="text-sm font-medium text-gray-700">City</span>
            <span className="text-sm text-gray-800">addressData.city</span>
          </div>
          <div className="w-1/2">
            <span className="text-sm font-medium text-gray-700">State</span>
            <span className="text-sm text-gray-800">addressData.state</span>
          </div>
        </div>
        {/* Zip Code */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Zip Code</span>
          <span className="text-sm text-gray-800">addressData.zipCode</span>
        </div>
        {/* Country */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Country</span>
          <span className="text-sm text-gray-800">addressData.country</span>
        </div>
        {/* Action Button */}
        <div className="mt-6 flex justify-center">
          <button
          onClick={()=>navigate('/proceed/address')}
            type="button"
            className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 focus:outline-none transition-colors duration-300"
          >
            Edit Address
          </button>
        </div>
      </div>
    </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Order Summary</h2>
        {/* Order Details Section */}
        <div className="space-y-6">
          {/* Product 1 */}
          {cartData?(
          cartData.map((product)=>(
          <div key={product.Details[0]._id} className="flex items-center justify-between border-b border-gray-300 pb-4">
            <div className="flex items-center space-x-4">
              <img
                src={product.Details[0].image
                }
                alt="Product"
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Product Title 1</h3>
                <p className="text-sm text-gray-600">Description of the product goes here.</p>
              </div>
            </div>
        {product.Details[0].discount?<div className="text-red-500 line-through font-semibold">${product.cartData.quantity*product.Details[0].price}</div>:null}
            <div className="text-gray-800 font-semibold">${product.Details[0].discount?product.cartData.quantity*(product.Details[0].price-(product.Details[0].price*product.Details[0].discount/100)):product.cartData.quantity*product.Details[0].price}</div>
<div className="flex items-center space-x-4 justify-center">
     { buyingDetails!=0?(<button
          value="-"
          onClick={(e) => productQuantityUpdate(e.currentTarget.value,product)}
          type="button"
          className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          -
        </button>):null
}
      <div className="text-xl font-semibold text-gray-800 bg-gray-100 p-4 rounded-md shadow-lg">
        Quantity: <span className="text-green-500">
          {buyingDetails==0?(product.cartData.quantity):(quantityCount)
}
          </span>
      </div>
  {buyingDetails!=0?(    <button
        value="+"
        onClick={(e) => productQuantityUpdate(e.currentTarget.value,product)}
        type="button"
        className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        +
      </button>
  ):null}
    </div>
          </div>
           ) )
          ):null
          }
        </div>
        {/* Order Total Section */}
        <div className="mt-6 border-t border-gray-300 pt-4">
          <div className="flex justify-between text-gray-800 font-semibold">
            <span>Subtotal</span>
            <span>$89.97</span>
          </div>
          <div className="flex justify-between text-gray-800 font-semibold">
            <span>Tax (5%)</span>
            <span>$4.50</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-gray-800 mt-4">
            <span>Total</span>
      {money2>0&&money!=money2?<span className='line-through text-red-500'>${money2}</span>:null}
            <span>${money}</span>
          </div>
        </div>
        {/* Button to Proceed */}
        <div className="mt-8 flex justify-center">
          <button onClick={updateUser} className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none transition-colors duration-300">
            Proceed to Checkout 
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ordersumary;
