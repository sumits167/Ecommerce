import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { details } from '../store/user';
import { useDispatch } from 'react-redux';
import {  toast } from 'react-toastify';
import { status } from '../store/user';


const Login = () => {

  const dispatch=useDispatch();

  const {handleSubmit,register}=useForm();
  const navigate=useNavigate();

  const formData=(data)=>{



    fetch('http://localhost:3000/api/user/login',{
      method:"post",
      headers:
      {'Content-type':'application/json'},
      body:
      JSON.stringify({
        username:data.username,
        password:data.password
      })
    })
    .then((res)=>{

      return res.json();
    })
    .then((data)=>{
   
      if(data.msg) {


        localStorage.setItem('token',data.token)
        localStorage.setItem('result',JSON.stringify(data))

        dispatch(status());
        toast.success("Login suuccesfull")
        let username=data.username;
        let password=data.password;
        dispatch(details(data));
        navigate('/books');
       
      }else{
        toast.error("Username or password wrong")

      }
      
    })

  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        
        {/* Login Form */}
        <form onSubmit={handleSubmit(formData)}>
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              {...register("username",{required:true})}
              placeholder="Enter your username"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              {...register("password",{required:true})}
              placeholder="Enter your password"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Login Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none transition-colors duration-300"
            >
              Login
            </button>
          </div>
        </form>

        {/* Forgot Password Link */}
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-500 hover:underline">Forgot your password?</a>
        </div>

        {/* Signup Link */}
        <div className="mt-2 text-center">
          <p className="text-sm text-gray-600">Don't have an account? <button onClick={()=>navigate('/test')} className="text-blue-500 hover:underline">Sign Up</button></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
