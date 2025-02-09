import React, { useState } from "react";
import { pay } from "../store/cart";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Showcard = ({inStock,url,count, authors, categories, data, statu, quantity, handleQuantity, disPatchandle,price,upDatePayment}) => {
  
    const dispatch=useDispatch();
  
    const navigate=useNavigate();
    let discount=data.discount?price*data.discount/100:0;
    const [totalPrice,setTotalPrice]=useState(quantity*(price-discount));

    //Qunatiy

    const [countt,setCount]=useState(quantity);

    const pr=(e)=>{
      
      if(e=="+"){
        setTotalPrice((prev)=>prev+=(price-discount))

      }else if(e=="-"){ 
        setTotalPrice((prev)=>prev-=(price-discount))

      }else{
        setTotalPrice((prev)=>prev-=((price-discount)*countt))
      }
    }

    let check=true;
    const money=(q)=>{
        
        let e=q.currentTarget.value;
        
        upDatePayment(price,e,data.discount,countt);
        handleQuantity(e,check,countt);
        pr(e);
        dispatch(pay({price,e}));
      if(e=="+"){
        setCount((prev)=>prev+=1);
      }else{
        if(countt<=1){
        }
        setCount((prev)=>prev-=1);

      }
    }

  return (
    <div>
      <div className="max-w-full flex items-center bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 space-x-6">
        {/* Product Image */}
        <img className="w-32 h-32 object-cover rounded-lg" src={url} alt="title" />

        {/* Product Details */}
        <div className="flex flex-col justify-between w-full">
          <h2 className="text-xl font-semibold text-gray-800 truncate">{categories}</h2>
          <p className="mt-2 text-gray-600 text-sm">{authors}</p>

          {/* Price Section */}
          <div className="mt-4 flex items-center justify-start">
            {data.discount?<span className="text-lg line-through  font-bold text-red-600">${price}</span>:null}
            <span className="text-lg font-bold text-green-600">${data.discount?price-(price*data.discount/100):price}</span>
          </div>
        </div>

        {/* Add to Cart / Quantity Section */}
        {
          !inStock?(
            <p>Out of stock</p>
          ) : (
            <div>
              <div className="flex items-center space-x-4">
                {/* Decrease Button (−) */}
                <button
                  value="-"
                  onClick={(e) => money(e)}
                  className="bg-blue-500 text-white text-2xl font-bold p-2 rounded-full transition duration-200 ease-in-out shadow-md hover:bg-blue-600 focus:outline-none"
                >
                  −
                </button>

                {/* Quantity Display */}
                <span className="text-lg font-semibold text-gray-800">{ countt}</span>

                {/* Increase Button (+) */}
                <button
                  value="+"
                  onClick={(e) => money(e)}
                  className="bg-blue-500 text-white text-2xl font-bold p-2 rounded-full transition duration-200 ease-in-out shadow-md hover:bg-blue-600 focus:outline-none"
                >
                  +
                </button>
              </div>
            </div>
          )
        }

        <div className="bg-gray-350">
          {totalPrice}
        </div>
      </div>

      <button value='remove'  onClick={(e)=>money(e)}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        Remove from Cart
      </button>
    </div>
  );
};

export default Showcard;
