import { configureStore } from '@reduxjs/toolkit'; import authReducer from './slice/auth.slice';
 import productReducer from "./slice/product.slice"

  export const store = configureStore({  
       reducer: { 
                auth: authReducer, 
                        product: productReducer 
                        }, });