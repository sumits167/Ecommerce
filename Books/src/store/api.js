import {createSlice} from '@reduxjs/toolkit'
import { act } from 'react';


const initialState={
    cart:[
       
    ],
    topay:0,
    change:0
}
const apiData=createSlice({
    name:"api",
    initialState,
    reducers:{
            push:(state,action)=>{
                console.log("payload=",action.payload);
                state.cart.push({cart:action.payload.el,status:true,quantity:1})
            },
            status:(state,action)=>{

                state.cart.map((el)=>action.payload==el.cart._id?el.status=!el.status:null)
            },    
            quantityItemPlus:(state,action)=>{
                state.cart.map((el)=>action.payload==el.cart._id?el.quantity++:null)
            },
            quantityItemDecrease:(state,action)=>{
                state.cart.map((el)=>action.payload==el.cart._id?el.quantity--:null)
            }
            ,
           
            change:(state,action)=>{

                
                if(action.payload=="+"){
                    state.change+=1;
                }else if(action.payload=="-"&&state.change!=0){
                    state.change-=1;
                }else{
                    state.change=0;
                }
            
            
            },
            clear:(state,action)=>{
                state.cart=[],
                state.topay=0,
                state.change=0
            }
    }

})

const {push,status,quantityItemPlus,quantityItemDecrease,change,clear}=apiData.actions;
export {push,status,quantityItemPlus,quantityItemDecrease,change,clear};

export default apiData.reducer