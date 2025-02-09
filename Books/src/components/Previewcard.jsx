import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Description from './Description';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addcart, renderAllCart } from '../store/cart';
import { cartStatus } from '../store/cart';
import { removeCart } from '../store/cart';
import { status } from '../store/api';
import { quantityItemPlus } from '../store/api';
import { quantityItemDecrease } from '../store/api';
import { quantityUpdate } from '../store/cart';
import Showcard from './Showcard';
import { pay } from '../store/cart';
import { change } from '../store/api';
import user from '../Api/user';
import { useLocation } from 'react-router-dom';
import {  toast } from 'react-toastify';
import { buy } from '../store/cart';
import { checkin } from '../store/cart';
import { useForm } from 'react-hook-form';
import { setaddReview } from '../store/cart';
import { useId } from 'react';



function Previewcard({inStock,statp, quantityp, statup, urlp,authorsp ,categoriesp, datap,upDatePayment}) {


 const {handleSubmit,register}=useForm();
const addReview=useSelector((state)=>state.cart.addReview)
const dispatch=useDispatch();


  const location=useLocation();

  const params=new URLSearchParams(location.search);

  const url=urlp?urlp:params.get('url');
  const authors=authorsp?authorsp:params.get('authors');
  const categories=categoriesp?categoriesp:params.get('categories');
  const dat=params.get('data');

  const data=datap?datap:dat?JSON.parse(decodeURIComponent(dat)):null;
  const quantity=quantityp?quantityp:params.get('quantity');
  const stat=statp?statp:params.get('stat');
  const statu=statup?statup:params.get('status');

  //user   data

let userLocal=JSON.parse(localStorage.getItem('result'));


  // const userData=useSelector((state)=>state.user.data);
  const userData=JSON.parse(localStorage.getItem('userData'))
  


let end=0;
if(userData.result[0].orderHistory){
  for(let i=0;i<userData.result[0].orderHistory.length;i++){
    for(let j=0;j<userData.result[0].orderHistory[i].orderDetails.length;j++){

      if(data._id==userData.result[0].orderHistory[i].orderDetails[j].productId){
        
        dispatch(setaddReview(true));
        end++;
        break;
      }
      if(end>0){
        break;
      }

      

    }
   
  }
}

//Ratings and Review function

const reviewDetails=async(e)=>{

  const review=e.review;

  try {
    let response=await fetch('http://localhost:3000/api/cart/ratingsAndReview',{
      method:'post',
      headers:
      {'Content-type':'application/json'},
      body:
      JSON.stringify(
        {
          productId:data._id,
          review:review,
          userDetail:userData.result[0].username,
          userId:userData.result[0]._id 

        }
      )
    });
    let dataa =await response.json();
    if(data){
      toast.success("Review Added Successfully")  
    }
  } catch (error) {
    console.log(error);
    
  }


 }

  //buy function

  const buying=()=>{

    let obj={
      Details:[{
        _id:data._id,
        price:data.price,
        image:url,
        discount:data.discount,
      }],
      cartData:{quantity:1,},
      
    }
    dispatch(buy([obj]));
    dispatch(checkin("clear"))
    navigate('/proceed/address');


  }

const userId=userData.result[0]._id;

useEffect(()=>{

  try {
    fetch('http://localhost:3000/api/user/users/',{
      method:'post',
      headers:
      {'Content-type':'application/json'},
      body:
      JSON.stringify(
        {
          id:userId
        }
      )
    })
    .then((res)=>res.json())
    .then((dataa)=>{

      let arr=dataa[0].cartData;
      for(let i=0;i<arr.length;i++){
        if(arr[i].productId==data._id){
          setCounting(arr[i].quantity);
          break;
        }
      }
      
      

    })
    
  } catch (error) {
    
  }


},[])

  const id=data?data._id:null;

  let price;

  if(Array.isArray(data)){

    price=data?data[0].price:null;
  }else{
    price=data?data.price:null;
  }

const navigate=useNavigate();
const [state,setState]=useState(false);

const [count,setCount]=useState(0);

let quan=parseInt(quantity);

const [counting,setCounting]=useState(quan);

const disPatchandle=async()=>{

  if(data.stock==0){
    navigate('/outofstock');
    return;

  }
  
  let e="+";
  dispatch(addcart({data,statu,count})); 
  dispatch(pay({price,e}))
  if(id){
     dispatch(status(id));
  }
  dispatch(change(e));
 await user.userData(userId,data,val);

  toast.success("Successfully add to cart")
 

  setCounting((prev)=>prev+1)
  
}


const removecart=()=>{
  
  dispatch(removeCart(id));
  dispatch(status(id));
}
 
let val;
const handleQuantity=async (e,check=false,coun)=>{

  
if(!check&&counting!=data.stock)  dispatch(change(e));

  if(e=="+"){

    if(counting==data.stock||coun==data.stock){
      navigate('/no-more-items-available');
      return
    }

     val="+";
    dispatch(quantityItemPlus(id))
    dispatch(quantityUpdate({val,id}));
 await user.userData(userId,data,val);
 
  toast.success("Succesfully item increase")
 
    setCounting((prev)=>prev+1);

    if(check){
      
    }

    if(!check){
    dispatch(pay({price,e}));
    }


    setCount((prev)=>prev+price)
 
  }else if(e=="-"){


    if(check&&coun<=1){
      await user.updateProduct(userId,data._id);
      dispatch(renderAllCart());
      return ;
    }

    if(!check&&counting==1){

      removecart();
      

   await user.updateProduct(userId,data._id);
   
   setCounting((prev)=>prev-1)
   
      return ;
    }

    val="-";
    dispatch(quantityItemDecrease(id))
    dispatch(quantityUpdate({val,id}))
   await user.userData(userId,data,val);

 
    toast("Succfull item decrese")
  
    setCounting((prev)=>prev-1);

    if(!check){
      dispatch(pay({price,e}));
      }
   
    setCount((prev)=>prev-price)
   
  }else{

    await user.updateProduct(userId,data._id);
    dispatch(renderAllCart());

  }

}
 

if(stat=="false"){
 
  return (
    <div>
      <Showcard inStock={inStock} price={price} count={count} handleQuantity={handleQuantity} disPatchandle={disPatchandle}  url={url} authors={authors} categories={categories} data={data}  statu={statu} quantity={quantity} upDatePayment={upDatePayment}/>
    </div>
  )
}else{

  return (

    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:shadow-2xl transition duration-300 ease-in-out ">
      {/* Image Section */}
      <img 
        src={url}
        alt="Card image"  
        className="w-full h-64 object-cover"
      />

    

      {/* Card Footer */}
      <div className="p-6 pt-0 flex justify-between items-center">
        <p>Author:: {authors}</p>
        <p>Categories:: {categories}</p>

        <button  onClick={()=>setState(!state)} className="text-teal-500 hover:text-teal-700 transition duration-200 ease-in-out">
    Read More 
   
</button>

<div className="mt-4 flex justify-between items-center">
          <div className="text-xl font-bold text-green-600">
          {data.discount>0?<p className='line-through text-red-500'>${price}</p>:null}

            {data.discount>0?price-(price*data.discount/100):price}
          </div>
          <p>{data.discount>0?<p className='text-green-600 '>{data.discount}% Discount on the product</p>:null}</p>
          </div>

{data&&data.stock?( <div className="text-xl font-semibold text-gray-800 bg-gray-100 p-4 rounded-md shadow-lg">
      Stock: <span className="text-green-500">{data.stock}</span>
    </div>): <div className="w-32 h-12 bg-red-500 text-white flex items-center justify-center rounded-lg shadow-lg">
    <span className="text-sm font-semibold">Out of Stock</span>
  </div> }



</div>
      {state&&
 <Description data={data} url={url} authors={authors} categories={categories}/>
        
 }

{/* 
//Buy Now Button */}

{data&&data.stock?(
 <div>

 {counting<1?(<button  className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
            Add to Cart' onClick={()=>disPatchandle()} >Add to Cart</button>):<div>



            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg space-x-4">
      {/* Decrease Button (−) */}
      <button  value="-" onClick={(e)=>handleQuantity(e.currentTarget.value)} className="bg-blue-500 text-white text-2xl font-bold p-2 rounded-full transition duration-200 ease-in-out shadow-md hover:bg-blue-600 focus:outline-none">
        − 
      </button>

      {/* Quantity Display */}
      <span className="text-lg font-semibold text-gray-800">{counting}</span>

      {/* Increase Button (+) */}
      <button value="+" onClick={(e)=>handleQuantity(e.currentTarget.value)} className="bg-blue-500 text-white text-2xl font-bold p-2 rounded-full transition duration-200 ease-in-out shadow-md hover:bg-blue-600 focus:outline-none">
        +
      </button>
    </div>

</div>

 }
 <button onClick={()=>buying()} className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
      Buy Now
    </button>
            </div>
            
):null
          
            }

{/* //Ratings and review section */}

<div key={crypto.randomUUID()} className="max-w-4xl mx-auto p-4">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ratings & Reviews</h2>

      {/* Ratings */}
      <div  className="flex items-center mb-4">
        <span className="text-xl font-medium text-gray-800 mr-2">4.5</span>
       

        <span className="text-sm text-gray-600 ml-2">{data?data.reviewCount:null} Reviews</span>
      </div>

       {/* Add a Review Section */}
       {addReview?(
       <form onSubmit={handleSubmit(reviewDetails)}>
       <div className="mt-8">
        
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Your Review</h3>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          rows="4"
          placeholder="Write your review..."
          {...register('review',{required:true})}
        ></textarea>
        <div className="flex justify-between items-center">
          <button type='submit' className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" >Submit Review</button>
        </div>
      </div>
      </form>
       ):null
       }
      {/* Reviews List */}

{data?(data.review.map((reviews)=>(
      <div className="space-y-4">
        {/* Review 1 */}
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center mb-2">
           

            <div className="flex justify-center mb-2">
        <img
          src={reviews.userDetails.profileImageUrl}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover shadow-lg"
        />
      </div>

            <span className="ml-2 text-gray-700 font-medium">{reviews.review.username}</span>
          </div>
          <p className="text-gray-600">{reviews.review.review}</p>
        </div>
        <p>Last Modified: {reviews.review.lastModified}</p>
      </div>  
))
):null 
}

    </div>

</div>
  )
}
}

export default Previewcard