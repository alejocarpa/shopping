import { useState } from "react";
import { ProductCardProps } from "../components/ProductCard";
import { useDispatch } from "react-redux";
import { updateCart } from "../store/shopping/shoppingSlice";


export const useProduct = ( { product }: ProductCardProps ) => {

    const [counter, setCounter] = useState( 0 );

    const dispatch = useDispatch();

    const increaseBy = ( value:number ) => {

        const newValue = Math.max( counter + value, 0 )
        setCounter( newValue );

        dispatch( updateCart({ product, newValue }) );

    }

    return {
        counter,
        increaseBy
    }
}
