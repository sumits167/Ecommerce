import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {

  const navigate=useNavigate();
  const userId=useSelector((state)=>state.user.data.result[0]._id);
  const [userData,setUserData]=useState();
  const[orderHistory,setOrderHistory]=useState();

  useEffect(()=>{

    try {
      fetch('http://localhost:3000/api/user/profile',{
        method:'post',
        headers:
        {'Content-type':'application/json'},
        body:
        JSON.stringify({
            UserId:userId
        })
    })
    .then((res)=>res.json())
    .then((data)=>{
      setUserData(data);
      setOrderHistory(data.orderHistory);
    })
    } catch (error) {
      console.log(error);
    }
  },[])












  // Static User Data (Replace this with dynamic data or fetched data in real applications)
  const user = {
    name: 'Jane Doe',
    email: 'janedoe@example.com',
    profilePicture: 'https://via.placeholder.com/150',
    address: {
      street: '123 Main St',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
    },
    orderHistory: [
      { orderId: '12345', date: '2024-11-01', total: '$120.00' },
      { orderId: '12346', date: '2024-10-15', total: '$55.00' },
    ],
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Profile Header */}
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">My Profile</h2>

      {/* Profile Picture and Name */}
      {userData?(
      <div>
      <div className="flex justify-center mb-6">
        <img
          src={userData.profileImageUrl}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover shadow-lg"
        />
      </div>
      <button className='bg-blue-400' onClick={()=>navigate('/AvatarSection')} >Change</button>

      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">{userData.address.name}</h3>
        <p className="text-gray-600">{userData.address.email}</p>
      </div>

      {/* Shipping Address */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Shipping Address</h3>
        <p className="text-gray-600">{userData.address.address}</p>
        {/* <p className="text-gray-600">{user.address.city}, {user.address.state} {user.address.zip}</p> */}
      </div>
      </div>
      ):null
}


      {/* Order History */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Order History</h3>
        {orderHistory ? (
          <ul className="space-y-4">
            {orderHistory.map((order) => (
              <li key={uuidv4()}
               className="border p-4 rounded-lg shadow-sm">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">Order ID: {order.receiptData.order_id
                    }</p>
                    <p className="text-gray-600">Date: {order.receiptData.date}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Total: {order.receiptData.amount/100}  INR</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">You have no previous orders.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
