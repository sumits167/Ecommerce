import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';


const Testcard = () => {

  const navigate=useNavigate();
const {handleSubmit,register}=useForm();

const formData=(data)=>{
console.log(data);

fetch('http://localhost:3000/api/user/signup',{
  method:"post",
  headers:
  {'Content-type':'application/json'},
  body:
  JSON.stringify({
    username:data.fullName,
    password:data.password
  })
})
.then((res)=>{
  console.log(res);
  return res.json();
})
.then((data)=>{
  console.log(data);

  if(data.msg){
    toast("Signup succsesfully");
       navigate('/')
  }else{
    toast.error("Somthing went wrong");
  }
})



}

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create an Account</h2>
        
        {/* Sign-up Form */}
        <form onSubmit={handleSubmit(formData)}>
          {/* Full Name */}
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="fullName"
              {...register("fullName",{required:true})}
              placeholder="Enter your full name"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Address */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              {...register("email",{required:true})}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              {...register("password",{required:true})}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Alternative Sign Up Link */}
        <div className="mt-4 text-center text-gray-600">
          <p>Already have an account? <button onClick={()=>navigate('/login')} className="text-blue-500 hover:text-blue-600">Log in </button></p>
        </div>
      </div>
    </div>
  );
};

export default Testcard;
