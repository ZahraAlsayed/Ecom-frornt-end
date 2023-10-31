/* eslint-disable prettier/prettier */
import { createSlice, createAction  } from '@reduxjs/toolkit'

import { Product } from "./productSlice";

export type CartItem = {
    product: Product;
    quantity: number;
}

export type CartState = {
    items: CartItem[];
}
//export const addToCart = createAction<CartItem>('ADD_TO_CART');
//export const removeFromCart = createAction<number>('REMOVE_FROM_CART');

const initialState: CartState = {
    items: [],
    
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find((item) => item.product.id === action.payload.product.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        removeFromCart: (state, action) => { 
            state.items = state.items.filter((item) => item.product.id !== action.payload);

        }

    },
});

export const {addToCart ,removeFromCart} = cartSlice.actions
export default cartSlice.reducer;