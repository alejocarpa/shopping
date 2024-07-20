import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard"
import { getAllProducts } from "../store/shopping/thunks";

export const ProductsSection = () => {

    const [dataProducts, setDataProducts] = useState([]);
    
    const obtenerData = async() => {
        
        setDataProducts( await getAllProducts() );
        
    }
    
    useEffect(() => {
        obtenerData();
    }, []);

    return (
        <div className="w-full mt-10 flex justify-center ">
            <div className="w-3/4 flex flex-col">
                <h1 className="text-2xl text-center">Productos</h1>
                <div className="pt-3 flex justify-evenly flex-wrap">
                    {
                        dataProducts.length > 0
                        &&
                        dataProducts.map( (product, index) => (
                            <ProductCard key={ index } product={ product } />
                        ))

                    }
                </div>
            </div>
        </div>
    )
}
