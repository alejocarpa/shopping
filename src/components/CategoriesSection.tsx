
import { useEffect, useState } from "react";
import { Category } from './Category';
import { getAllCategories } from "../store/shopping/thunks";

export const CategoriesSection = () => {

    const [dataCategories, setDataCategories] = useState([]);
    
    const obtenerData = async() => {
        
        setDataCategories( await getAllCategories() );
        
    }
    
    useEffect(() => {
        obtenerData();
    }, []);

    return (
        <div className="w-full mt-10 flex justify-center ">
            <div className="w-3/4 flex flex-col">
                <h1 className="text-2xl text-center">Categorias</h1>
                <div className="w-full pt-3 flex justify-evenly flex-wrap">
                    {
                        dataCategories.length > 0
                        &&
                        dataCategories.map( (category, index) => (
                            <Category key={ index } category={ category } />
                        ))

                    }
                </div>
            </div>
        </div>
    )
}
