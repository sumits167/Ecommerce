import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { address } from '../../store/cart';
import { useDispatch, useSelector } from 'react-redux';
import { cartstatus } from '../../store/cart';
import user from '../../Api/user';

function Address() {

  const userr=useSelector((state)=>state.user.data);

  const [location,setLocation]=useState(0);
    const {handleSubmit,register,setValue}=useForm();
    const dispatch=useDispatch();
    const navigate=useNavigate();

    useEffect(()=>{
      try {
        fetch('http://localhost:3000/api/user/users',{
          method:'post',
          headers:
          {'Content-type':'application/json'},
          body:
          JSON.stringify({
            id:userr.result[0]._id
          })
        })
        .then((res)=>res.json())
        .then((data)=>{
         
          setLocation(data[0].address);
          
        })
        
      } catch (error) {

        console.log(error);
      }
    },[])




    useEffect(()=>{
      if(location){
      setValue('name',location.name);
      setValue('email',location.email);
      setValue('address',location.address);
      }
    },[location,setValue])
  


   


    const formVal=async(data)=>{
     
        dispatch(address(data));
        await user.address(data,userr.result[0]._id);
        navigate('/proceed/orderSumary')
    }

  return (
    <div>
           <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add Information</h2>

      <form onSubmit={handleSubmit(formVal)} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            name="name"
          
            type="text"
            placeholder={location?location.name:"name"}
          
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("name",{required:false})}
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
       
            type="email"
            placeholder={location?location.email:"email"}
           
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("email",{required:true})}
         />
        </div>

        {/* Address Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <textarea


        placeholder={location?location.address:"address"}
       
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("address",{required:true})}
       />
        </div>

        {/* Submit Button */}
        <div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none transition-colors duration-300"
          >
            Next
          </button>
        </div>
      </form>
    </div>

    </div>
  )
}

export default Address