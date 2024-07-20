import { createSlice } from '@reduxjs/toolkit';

export const shoppingSlice = createSlice({
    name: 'shopping',
    initialState: {
        initialCredit: 8000,
        productsInCart: []
    },
    reducers: {
        updateCart: ( state, action ) => {

            if( state.productsInCart.findIndex( product => product.id == action.payload.product.id) === -1 ){

                state.productsInCart = [ ...state.productsInCart, { ...action.payload.product, quantity: action.payload.newValue } ];
            }else{
                state.productsInCart[state.productsInCart.findIndex( product => product.id == action.payload.product.id)] = { ...action.payload.product, quantity: action.payload.newValue }
            }
            
            if( action.payload.newValue === 0 ){

                state.productsInCart = state.productsInCart.filter( product => product.id !== action.payload.product.id );
            }
            
        },
        
    }
});


// Action creators are generated for each case reducer function
export const 
    { 
        updateCart,
        
    } = shoppingSlice.actions;