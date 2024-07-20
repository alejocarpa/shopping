import { useProduct } from "../hooks/useProduct";
import { ProductCardProps } from './ProductCard';

export const ProductButtons = ({ product }: ProductCardProps ) => {

    const { increaseBy, counter } = useProduct({ product });

    return (
        <div 
            className="flex m-3 flex-row"
        >
            <button 
                className="pointer border rounded-s-sm w-8"
                onClick={ () => increaseBy( -1 ) }
            > - </button>

            <div className="border w-8 text-center">{ counter }</div>

            <button 
                className="pointer border rounded-e-sm w-8"
                onClick={ () => increaseBy( +1 ) }
            > + </button>
        </div>
    )
}
