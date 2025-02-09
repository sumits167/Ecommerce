import React,{useEffect} from 'react'
import Fetchbtn from './Fetchbtn'
import { useNavigate } from 'react-router-dom'
import allData from '../Api/Alldata';
import { push } from '../store/api';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { render } from '../store/user';

function Home() {
    const navigate=useNavigate();
   const disPatch=useDispatch();
const userData=useSelector((state)=>state.user.data);


    useEffect(()=>{
   
      let pages=4;
      let limit=20;
     allData.fetch({pages,limit})
     .then((data)=>{
      if(data){
       console.log("Home data=",data);
        data.map((el)=>{
          console.log("el===",el)

          

    disPatch(push({el}));
   






          
        })
       
      }
      navigate('/books')
     })
    })



  return (

    <div>
        Home
    <img src="https://images-platform.99static.com//PiHWJxAcOnC7gw197YEXKtyxDXQ=/fit-in/500x500/99designs-contests-attachments/39/39493/attachment_39493946"/>

        
        
    </div>
  )
}

export default Home