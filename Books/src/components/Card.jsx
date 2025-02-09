import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Previewcard from './Previewcard';
import Description from './Description';
import { useId } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Test2 from './Test2';
import { setaddReview } from '../store/cart';
import { useDispatch } from 'react-redux';


function Card({data,id,status,quantity}) {

const dispatch=useDispatch();

const navigate=useNavigate();
  
    const [url,setUrl]=useState();
    const [authors,setAuthors]=useState();
    const [categories,setCategories]=useState();
    useEffect(()=>{
        if(data){
            try {
               let url= data.image;
               let authors=data.authors;
               let categories=data.title;
                    setAuthors(authors);
                    setCategories(categories);
                    setUrl(url);
                
            } catch (error) {
            }
        }
    })

    let da=encodeURIComponent(JSON.stringify(data))

const recomenDation=()=>{
  dispatch(setaddReview(false));
  

}


  return ( 

    <div >
      <div key={useId()} className='flex flex-col items-center p-4 space-y-4'>
       <Link onClick={()=>recomenDation()} to={`/preview?url=${url}&quantity=${0}&authors=${authors}&data=${da}&categories=${categories}&statu=${status}&stat="true"` } >


      {/* <Previewcard url={url} quantity={quantity}  authors={authors} statu={status} categories={categories} data={data} stat="true" /> */}

     <Test2   url={url}   authors={authors} statu={status}  data={data}  />
       </Link>    
      </div>
    
    


</div>
  );
}

export default Card;
