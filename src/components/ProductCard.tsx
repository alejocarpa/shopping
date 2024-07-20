import noImage from "../assets/no-image.jpg";
import { ProductButtons } from "./ProductButtons";

export interface ProductCardProps {
    product?: ProductObject;
}

export interface ProductObject {
    id: string;
    name: string;
    description: string;
    price: string;
    category_id: string;
    created_at: string;
    updated_at: string;
    name_category: string;
    quantity?: number;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className="w-60 border rounded mb-4">
            <div className="w-full">
                <img 
                    className="size-60 rounded" 
                    src={ noImage } 
                    alt="Product Image"
                />  
            </div>
            <div className="w-full flex pl-2">
                { product?.name }
            </div>
            <div className="w-full flex pl-2">
                { product?.description }
            </div>
            <div className="w-full flex pl-2">
                { `$${ product?.price }` }
            </div>
            <div className="w-full flex pl-2 justify-center">
                <ProductButtons product={ product } />
            </div>
        </div>
    )
}
