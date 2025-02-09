import React, { useState } from 'react'
import allData from '../Api/Alldata'
import { useDispatch } from 'react-redux';
import { push } from '../store/api';
import { useNavigate } from 'react-router-dom';

class FetchData{
  
  async fetch() {

    const disPatch=useDispatch();
    const navigate=useNavigate();
   
        let pages=4;
        let limit=10;
       let data=await allData.fetch({pages,limit})
       if(data){
        disPatch(push(data));
        navigate('/books');
       }
  }
}

const Fetchbtn=new FetchData()
export default Fetchbtn