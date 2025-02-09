import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import Fetchbtn from './Fetchbtn';
import { useSelector } from 'react-redux';
import { status } from '../store/user';
import { clear } from '../store/api';
import { clearUser } from '../store/user';
import { clearCart } from '../store/cart';
import { useDispatch } from 'react-redux';
import {  toast } from 'react-toastify';
import { BookOpenIcon } from '@heroicons/react/24/outline'; 
import { ShoppingCartIcon } from '@heroicons/react/24/outline'; 

function Header() {

  const change=useSelector((state)=>state.api.change);
  const render=useSelector((state)=>state.user.render)
  const [user,setUser]=useState();
  const statuss=useSelector((state)=>state.user.status);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [userData,setUserData]=useState();
  const token=localStorage.getItem('token');

  useEffect(()=>{
    if(!token){
      return;
    }

    let user2=JSON.parse(localStorage.getItem('result'));
    setUser(JSON.parse(localStorage.getItem('result')));

    try {
      fetch('http://localhost:3000/api/user/profile',{
        method:'post',
        headers:
        {'Content-type':'application/json'},
        body:
        JSON.stringify({
            UserId:user2.result[0]._id
        })
      })
      .then((res)=>res.json())
      .then((data)=>{
        setUserData(data);
      })
    } catch (error) {
    }
  },[render])

  const process=()=>{
    localStorage.clear();
    setUser(undefined)
    dispatch(clear());
    dispatch(clearUser());
    dispatch(clearCart());
    toast.success("Successfully logout")
    navigate('/');
  }

  return (
    <header className="bg-gradient-to-r from-pink-600 to-teal-500 text-white shadow-lg p-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-3xl font-extrabold">
          <div className="flex justify-center items-center min-h-15 bg-gray-100">
            <Link to='/books'>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
                Port
              </h1>
            </Link>
          </div>
        </div>

        {/* Search button */}
        {user?(
          <button onClick={()=>navigate('/search')} className="flex items-center justify-center px-6 py-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out">
            <span className="mr-2">Search</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 18l6-6m0 0a8 8 0 10-8 8 8 8 0 008-8z" />
            </svg>
          </button> 
        ):null}

        {user?(
          <Link to='/profilePage'>
            <div className="flex justify-center mb-1">
              <img
                src={userData?(userData.profileImageUrl):null}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover shadow-lg"
              />
            </div>
          </Link>
        ):null}

        {/* Desktop Navigation */}
        {user?(
          <nav className="hidden md:flex space-x-10">
            <button 
              onClick={()=>navigate('/books')}
              type="button"
              className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <BookOpenIcon className="w-6 h-6" /> {/* Book Icon */}
              <span>Books</span> {/* Button text */}
            </button>
            <button 
              onClick={()=>navigate('/all-cart')} 
              type="button"
              className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              {change>0?(<p>{change}</p>):null}
              <ShoppingCartIcon className="w-6 h-6" /> {/* Cart Icon */}
              <span>Cart</span> {/* Button Text */}
            </button>
            <div className="flex justify-center items-center min-h-15">
              <button
                type="submit"
                className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
                onClick={()=>process()}
              >
                Logout
              </button>
            </div>
          </nav>
        ):null}

        {/* Mobile Navigation (Hidden on Large Screens) */}
        <div className="md:hidden flex items-center">
          <button className="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Links (Hidden by default) */}
      <div className="md:hidden mt-4 space-y-4">
        <nav className="flex flex-col items-center">
          <a href="/" className="text-lg text-white hover:text-yellow-400">Home</a>
          <a href="/about" className="text-lg text-white hover:text-yellow-400">About</a>
          <a href="/services" className="text-lg text-white hover:text-yellow-400">Services</a>
          <a href="/contact" className="text-lg text-white hover:text-yellow-400">Contact</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
