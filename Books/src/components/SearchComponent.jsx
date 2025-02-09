import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { isEmpty, throttle } from 'lodash';
import { useId } from 'react';
import { setaddReview } from '../store/cart';
import { useDispatch } from 'react-redux';

const SearchComponent = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [input,setInput]=useState();
    const [change,setChange]=useState();
    const [state,setState]=useState(true);
    const [searchHistory,setSearchHistory]=useState();
    const [productData,setProductData]=useState([]);
    const [skip,setSkip]=useState(0);

    const [isScrolled,setIsScrolled]=useState(true);
    const [E,setE]=useState();

let token=localStorage.getItem('token');
let userData=JSON.parse(localStorage.getItem('result'))


let Ee;

useEffect(()=>{

    if(!token){
    navigate('/login');
    }


},[])


useEffect(()=>{


    try {
        
    
        fetch("http://localhost:3000/api/user/searchItems",{
            method:"post",
            headers:
            {"Content-type":"application/json"},
            body:
            JSON.stringify({
                id:userData.result[0]._id
            })
        })
        .then((res)=>res.json())
        .then((data)=>{
           
            setSearchHistory(data)
           
        })
    } catch (error) {
            console.log(error)
    }
    

},[change])





//Working on future

//Scroll function

 let s=100;
    const handleScroll=throttle(()=>{

      let scrollY=window.scrollY;
      
      if(scrollY>s){
        s+=500;
   
        setSkip((prev)=>prev+=8)
       setIsScrolled((prev)=>!prev)
      
      handleSearch(E,true);
      
      }else{

    
      }


    },200)


    useEffect(()=>{

      window.addEventListener('scroll',handleScroll);

      return ()=>{
        window.removeEventListener('scroll',handleScroll);
      }
    },[])





const handleHistory=(el)=>{
    dispatch(setaddReview(false));

    try {
        
    
    fetch("http://localhost:3000/api/user/searchHistory",{
        method:"post",
        headers:
        {"Content-type":"application/json"},
        body:
        JSON.stringify({
            searchTerm:el.title,
            userId:userData.result[0]._id
        })
    })
    .then((res)=>res.json())
    .then((data)=>{
     
       
    })
} catch (error) {
        console.log(error)
}

}


    const handleSearch=(e,status=false)=>{

        setInput(e.currentTarget.value);
        setSkip(0);
setState(false);

       
      
        // console.log("Value ==",e.currentTarget.value)
            
let text=status?e:e.currentTarget.value;


if(status==false){
    setProductData([]);
    setE(e.currentTarget.value);

}

let skipp=status?skip:0;
        try {
            fetch('http://localhost:3000/api/cart/search',{
                method:"post",
                headers:
                {
                    Authorization:`Bearer ${token}`,
                    "Content-type":"application/json"
                },
                body:
                JSON.stringify({
                    text:text,
                    skip:skipp
                })
            })
            .then((res)=>res.json())
            .then((data)=>{
        
            data.map((el)=>{
                setProductData((prev)=>[...prev,el]);
            })
                
                    
            })
            
            
        } catch (error) {
            console.log(error);
        }

    }


const deleteHistory=(el)=>{

    setChange((prev)=>!prev);
    try {
        fetch('http://localhost:3000/api/user/deleteHistory',{
            method:"post",
            headers:
            {
             
                "Content-type":"application/json"
            },
            body:
            JSON.stringify({
                searchTerm:el,
                userId:userData.result[0]._id
            })
        })
        .then((res)=>res.json())
        .then((data)=>{
    
           
                
                
        })
    } catch (error) {
        console.log(error);
    }

}






  return (

    <div className="flex flex-col items-center p-4 space-y-4">
         {/* Input Box */}
    <div className="flex justify-center items-center p-4">
       
      <input
        type="text"
        placeholder="Enter something..."
        onChange={(e)=>handleSearch(e)}
        className="w-96 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
      />
    
    </div>

{/* //search history */}

{state?(

    <div className='bg-gray-400 rounded-l'>
<p className='bg-gray-200 rounded-xl' >Search history</p>
{searchHistory?searchHistory[0].searchHistory.map((el)=>(
<div key={el}>
<h3>{el}</h3>

<button onClick={()=>deleteHistory(el)} className='bg-red-400 rounded-xl'>Delete</button>


</div>

)):null
}

</div>

):null

}





    <div className="flex flex-wrap justify-center items-center space-x-4">
  {productData ? productData.map((el) => (
    <div key={el._id}>
    <Link onClick={()=>handleHistory(el)} to={`/preview?url=${el.image}&quantity=${0}&authors=${el.title}&data=${encodeURIComponent(JSON.stringify(el))}&categories=${el.title}&statu=${true}&stat="true"` }>
    <div className="w-64 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out mb-4">
         <img 
        className="w-10 h-10 object-cover" 
        src={el.image} 
        alt="Card Image"
      />

      <h3 className="text-xl font-semibold text-gray-700">{el.title}</h3>
      
    </div>
    </Link>
    </div>
  )) : null}
</div>



{/* <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Card Image Section */}
      {/* <img 
        className="w-full h-56 object-cover" 
        src={url} 
        alt="Card Image"
      /> */}

      {/* Card Content Section */}
      {/* <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">Card Title</h2>
        <p className="text-gray-600 mt-2">This is a description of the card. You can add more content here.</p>
      </div> */}

      {/* Card Footer Section */}
      {/* <div className="p-4 flex justify-between items-center border-t">
        <span className="text-sm text-gray-500">Some Footer Info</span>
        <button className="text-blue-500 hover:underline">Learn More</button>
      </div> */}
    {/* </div>
//  */} 






    </div>
  );
};

export default SearchComponent;
