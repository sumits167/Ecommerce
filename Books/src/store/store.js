import { configureStore } from "@reduxjs/toolkit";
import apiData from "./api";
import cart from './cart'
import user from './user'

const store=configureStore({
    reducer:{
        api:apiData,
        cart:cart,
        user:user
    }
})

export default store