import React, { useEffect } from 'react'
import { authenticationStatus } from '../store/user';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Authentication() {

    const navigate=useNavigate();
    const dispatch=useDispatch();

    let token=localStorage.getItem('token');

    useEffect(()=>{
    if(token){
        dispatch(authenticationStatus(true));
        navigate('/books')
    }else{
        dispatch(authenticationStatus(false));
        navigate('/login')
    }
},[])

return;


  
}

export default Authentication