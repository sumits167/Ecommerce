import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from './Card';
import LoadingSpinner from './LoadingSpinner';
import { useDispatch } from 'react-redux';
import { render } from '../store/user';
import allData from '../Api/Alldata';
import { details } from '../store/user';
import { throttle } from 'lodash';
import { useNavigate } from 'react-router-dom';

function Booksapi() {

  const navigate=useNavigate();
  const disPatch=useDispatch();
  const [data,setData]=useState([]);

  let localStorageData=JSON.parse(localStorage.getItem('result'));
  let token=localStorage.getItem('token')

  const [isScrolled,setIsScrolled]=useState(true);
  const [skip,setSkip]=useState(0);
  const [limit,setLimit]=useState(2);
  const [scrollData,setScrollData]=useState(150)

  const [count,setCount]=useState(0);
  useEffect(()=>{

    if(!token){
      navigate('/login');
    }

    disPatch(render());

    allData.fetch({skip,limit,token})
     .then((data)=>{
      if(data){
       data.map((el)=>{
        setData((prev)=>[...prev,el]);
       })
      }
     })

     fetch('http://localhost:3000/api/user/getUser',{
      method:"post",
      headers:
      {'Content-type':'application/json'},
      body:
      JSON.stringify({
        id:localStorageData.result[0]._id
      })
    })
    .then((res)=>res.json())
    .then((data)=>{
      disPatch(details(data))
      localStorage.setItem('userData',JSON.stringify(data));
    })
  },[isScrolled])

  let s=150;
  const handleScroll=throttle(()=>{
    const scrollY=window.scrollY;
    if(scrollY>s){
      s+=500;
      setLimit((prev)=>prev+=1) 
      setSkip((prev)=>prev+=4)
      setIsScrolled((prev)=>!prev)
      setScrollData((prev)=>prev+=500);
    }
  },200)

  useEffect(()=>{
    window.addEventListener('scroll',handleScroll);
    return ()=>{
      window.removeEventListener('scroll',handleScroll);
    }
  },[])

  if(!data){
    return (
      <LoadingSpinner/>
    )
  }
  return (
    <div className='bg-red-400'>
      <ul className='bg-gray-200'> 
        <div className='flex flex-wrap justify-center items-center space-x-4'>
          {data.length!=0?(data.map((el)=>(
            <li key={el._id}> <Card quantity={1} data={el} status={true} id={el._id}/></li>
          ))):null}
        </div>
      </ul>
    </div>
  )
}

export default Booksapi