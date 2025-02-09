import { createSlice } from "@reduxjs/toolkit";

const initialState={
    data:{},
    status:true,
    render:false,
    authenticationStatus:false
}



const user=createSlice({
    name:"user",
    initialState,
    reducers:{
        details:(state,action)=>{
            state.data=action.payload;
        },
        status:(state,action)=>{
            state.status=!state.status;
        },
        clearUser:(state,action)=>{
            state.data={},
            state.status=false
        },
        render:(state,action)=>{
            state.render=!state.render;
        },
        authenticationStatus:(state,action)=>{
            state.authenticationStatus=action.payload
        }
    }
})

const {details,status,clearUser,render,authenticationStatus}=user.actions;
export {details,status,clearUser,render,authenticationStatus};

export default user.reducer;