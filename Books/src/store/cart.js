import { createSlice } from "@reduxjs/toolkit";
import { status } from "./api";
import { act } from "react";


const initialState={
        data:[
        

        ]   
        ,
        address:{},
        topay:0,
        status:0,
        buy:[],
        check:0,
        addReview:false,
        renderAllCart:false
} 

const cart=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addcart:(state,action)=>{
           
            state.data.push({cart:action.payload.data,status:false,quantity:1});
            
           
        },
        cartStatus:(state,action)=>{

            state.data.status=false;
        }
        ,
        removeCart:(state,action)=>{
     
          state.data= state.data.filter(el=>action.payload!==el.cart.id);
        },
        quantityUpdate:(state,action)=>{
            state.data.map((el)=>{
                
                if(action.payload.id==el.cart._id){
                    if(action.payload.val=="+"){
                        el.quantity++;
                    }else{
                        el.quantity--;
                    }
                }

            
        }
)}
,
    address:(state,action)=>{
        state.address=action.payload;

    },
    pay:(state,action)=>{

        action.payload.e=="+"?(state.topay+=action.payload.price):(state.topay-=action.payload.price);
     },
     cartstatus:(state,action)=>{
      
        state.status=action.payload;
     },
     clearCart:(state,action)=>{
        state.data=[
        

        ]   
        ,
       state.address={},
        state.topay=0,
        state.status=0
        state.buy=[]
     },
     buy:(state,action)=>{
        state.buy=action.payload;
     }
    ,
    buyQuantityUpdate:(state,action)=>{
     
        action.payload=="+"?(state.buy[0].cartData.quantity++):(state.buy[0].cartData.quantity--);
       
    }
    ,
    checkin:(state,action)=>{
        if(action.payload=="clear"){
            state.check=0;
        }else{
            state.check++;
        }
    },
    setaddReview:(state,action)=>{
      action.payload==true?state.addReview=true:state.addReview=false;
    },
    renderAllCart:(state,action)=>{
        state.renderAllCart=!state.renderAllCart;
    }
 
    } 


})

const {addcart,cartStatus,removeCart,quantityUpdate,address,pay,cartstatus,clearCart,buy,buyQuantityUpdate,checkin,setaddReview,renderAllCart}=cart.actions;
export {addcart,cartStatus,removeCart,quantityUpdate,address,pay,cartstatus,clearCart,buy,buyQuantityUpdate,checkin,setaddReview,renderAllCart}
export default cart.reducer;