import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Previewcard from './Previewcard';
import { useDispatch } from 'react-redux';
import { change } from '../store/api';
import { useNavigate } from 'react-router-dom';
import { addcart } from '../store/cart';
import LoadingSpinner from './LoadingSpinner';
import { buy } from '../store/cart';
import { v4 as uuidv4 } from 'uuid';
import { renderAllCart } from '../store/cart';
import { useId } from 'react';

function Allcart() {
  
  const renderCart=useSelector((state)=>state.cart.renderAllCart);
  
  const [loading,setLoading]=useState(true);
  const [fetchData,setFetchData]=useState();
  const [qaun,setQuan]=useState();
  const [payMent ,setPayMent]=useState(0);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const pay=useSelector((state)=>state.cart.topay);
  const userData=useSelector((state)=>state.user.data);

  let id=useId();
  let token=localStorage.getItem('token');

  useEffect(()=>{
    const e="clear"
    dispatch(change(e))

    const call=async()=>{
      if(!token){
        return;
      }

      let user=JSON.stringify(localStorage.getItem('result'))

      let res=await fetch("http://localhost:3000/api/user/users",{
        method:"post",
        headers:
        {'Content-type':'application/json'},
        body:
        JSON.stringify({
          id:user.result[0]._id
        })
      });
      let data=await res.json();
      setFetchData(data);
    }

    let call2=()=>{
      if(!token){
        return;
      }

      let user=JSON.parse(localStorage.getItem('result'))

      try {
        fetch("http://localhost:3000/api/user/detail",{
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
          setFetchData(data);
          setLoading(false);
          return data;
        })
      } catch (error) {
      }
    }
    call2();
  },[renderCart])

  if(!token){
    return(
      <div>
        <p>Login to access the route</p>
      </div>
    )
  }else{
    fetchData&&payMent==0?(
      fetchData.map((el)=>{
        if(el.Details[0].stock>0){
          let discount=el.Details[0].discount?(el.Details[0].price*el.Details[0].discount)/100:0;
          setPayMent((prev)=>prev+=el.cartData.quantity*(el.Details[0].price-discount));
        }
      })
    ):null

    const upDatePayment=(price,e,discount,count)=>{
      let dis=discount?(price*discount)/100:0;
      if(e=="+"){
        setPayMent((prev)=>prev+=(price-dis))
      }else if(e=="-"){ 
        setPayMent((prev)=>prev-=(price-dis))
      }else{
        setPayMent((prev)=>prev-=((price-dis)*count))
      }
    }

    const nav=()=>{
      dispatch(buy([]))
      navigate('/proceed');
      navigate('/proceed/address')
    }

    const cartItems=useSelector((state)=>state.cart.data);

    if(loading){
      return(
        <LoadingSpinner/>
      )
    }

    if(fetchData&&fetchData.length==0){
      return(
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-lg shadow-md">
          <div className="text-center">
            <img 
              src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L2pvYjY4Ni0yNTMteC5qcGc.jpg" 
              alt="No Cart Items" 
              className="mx-auto mb-4 w-[150px] h-[150px] object-contain" // Adjusted width and height
            />
            <p className="text-xl font-semibold text-gray-700">No Cart Items Available</p>
          </div>
        </div>
      )
    }else{
      return (
        <div>
          <p class="text-2xl font-semibold text-gray-800 mt-4">All carts</p>
          <div>
            {fetchData?(
              fetchData.map((item)=>(
                <div key={crypto.randomUUID()}
                  
                  >
                  <Previewcard  inStock={item.Details[0].stock>0?true:false}  statp="false" quantityp={item.cartData.quantity} statup={false}  urlp={item.Details[0].image} authorsp={item.Details[0].authors} categoriesp={item.Details[0].title} datap={item.Details[0]} upDatePayment={upDatePayment}/>
                </div>     
              ))
            ):null}
          </div>
          <footer className="bg-gray-800 text-white py-8 mt-12">
            <div className="max-w-screen-xl mx-auto px-6">
              <div className="flex flex-wrap justify-between items-center">
                {/* Column 1: Navigation Links */}
                <div className="flex flex-col space-y-2">
                  <h4 className="text-lg font-semibold">Quick Links</h4>
                  <ul className="space-y-1 text-sm">
                  </ul>
                </div>
                {/* Column 2: Contact Info */}
                <div className="flex flex-col space-y-2">
                  <h4 className="text-lg font-semibold">Total price={payMent}</h4>
                  <button disabled={payMent<=0?true:false} onClick={()=>nav()} class="bg-green-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg focus:outline-none transition duration-300">
                    Tap to proceed
                  </button>
                  <p className="text-sm">Email: support@example.com</p>
                  <p className="text-sm">Phone: (123) 456-7890</p>
                </div>
                {/* Column 3: Social Media */}
                <div className="flex flex-col space-y-2">
                  <h4 className="text-lg font-semibold">Follow Us</h4>
                  <div className="flex space-x-4 text-lg">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
              {/* Bottom Section: Copyright */}
              <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm">
                <p>© 2024 Example Company. All Rights Reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      )
    }
  }
}

export default Allcart









