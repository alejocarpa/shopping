import { useEffect, useState } from "react";
import { ShoppingLayout } from "../layout/ShoppingLayout"
import { getAllCategories, getAllProducts, savingNewProduct } from "../store/shopping/thunks";
import { ProductObject } from "../components/ProductCard";
import { Table } from "../components/Table";
import { CategoryObject } from "../components/Category";
import { useForm } from "../hooks/useForm";
import Swal from "sweetalert2";

interface FormState {
    name: string;
    description: string;
    category: string;
    price: string;
}

export const ProductsPage = () => {

    const [data, setData] = useState<ProductObject[]>([]);
    const [dataCategories, setDataCategories] = useState<CategoryObject[]>([]);
    const [saved, setSaved] = useState(false);

    const { formState, name, description, category, price, onInputChange } = useForm({
        name: '',
        description: '',
        category: '',
        price: ''
    });
    
    const obtenerData = async() => {
        
        setData( await getAllProducts() );
        setDataCategories( await getAllCategories() );
    }

    const guardarProducto = async() => {

        const { ok }:any = await savingNewProduct( formState );

        if( ok ){
            Swal.fire({
                icon: 'success',
                title: 'Se guardo el producto',
                showConfirmButton: false,
                timer: 2500
            });
            setSaved(true);
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Ocurrio un error al momento de guardar',
                showConfirmButton: false,
                timer: 2500
            });
        }

    }

    const thead = ["Nombre", "Descripcion", "Categoria", "Precio"];
    
    useEffect(() => {
        obtenerData();
    }, [ saved ]);



    return (
        <>
            <ShoppingLayout>
                <div className="mt-36 pl-10 pr-10">
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <div className="grid grid-cols-1 gap-6">
                            <label className="block">
                                <span className="text-gray-700">Nombre</span>
                                <input type="text" name="name" value={ name } onChange={ onInputChange } className="form-input mt-1 block w-full border-2 rounded p-1" />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Categoria</span>
                                <select className="form-select mt-1 block w-full border-2 rounded p-1" name="category" value={ category } onChange={ onInputChange }>
                                    <option value="">Ninguna</option>
                                    {
                                        dataCategories.map( category => (
                                            <option key={ category.id } value={ category.id }>{ category.name }</option>
                                        ))
                                    }
                                </select>
                            </label>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            <label className="block">
                                <span className="text-gray-700">Descripcion</span>
                                <input type="text" name="description" value={ description } onChange={ onInputChange } className="form-input mt-1 block w-full border-2 rounded p-1" />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Precio</span>
                                <input type="number" name="price" value={ price } onChange={ onInputChange } className="form-input mt-1 block w-full border-2 rounded p-1" />
                            </label>
                        </div>
                    </div>
                    <div className="mt-7 flex justify-center">
                        <button onClick={ guardarProducto } className="bg-blue-600 text-white p-2 rounded">Guardar</button>
                    </div>

                    <div className="mt-7">
                        <Table thead={ thead } data={ data } />
                    </div>

                </div>
            </ShoppingLayout>
        </>
    )
}
