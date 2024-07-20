import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { ProductObject } from '../../components/ProductCard';

interface ShoppingState {
    initialCredit: number;
    productsInCart: ProductObject[];
  }
  
// Define the initial state using that type
const initialState: ShoppingState = {
    initialCredit: 8000,
    productsInCart: []
}

interface ProductInCart {
    productsInCart: ProductObject[];
}

export const shoppingSlice = createSlice({
    name: 'shopping',
    initialState,
    reducers: {
        updateCart: ( state, action: PayloadAction<any> ) => {

            if( state.productsInCart.findIndex( product => product.id == action.payload.product.id) === -1 ){

                state.productsInCart = [ ...state.productsInCart, { ...action.payload.product, quantity: action.payload.newValue } ];
            }else{
                state.productsInCart[state.productsInCart.findIndex( product => product.id == action.payload.product.id)] = { ...action.payload.product, quantity: action.payload.newValue }
            }
            
            if( action.payload.newValue === 0 ){

                state.productsInCart = state.productsInCart.filter( product => product.id !== action.payload.product.id );
            }
            
        },
        updateCredit: ( state, action: PayloadAction<any> ) => {

            state.initialCredit = action.payload.newCredit
        },
        cleanCart: ( state ) => {

            state.productsInCart = [];
        },
    }
});


// Action creators are generated for each case reducer function
export const 
    { 
        updateCart,
        updateCredit,
        cleanCart,
    } = shoppingSlice.actions;

    export const selectCount = (state: RootState) => state.shopping;

    export default shoppingSlice.reducer