import { configureStore } from '@reduxjs/toolkit'
import cartSliceReducer from './CartSlice'

export const store = configureStore({
    reducer: {
        cart: cartSliceReducer,
    },
});
