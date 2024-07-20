import { useEffect, useState } from "react";
import { ShoppingLayout } from "../layout/ShoppingLayout"
import { deleteProduct, getAllCategories, getAllProducts, getProduct, savingNewProduct, updatingProduct } from "../store/shopping/thunks";
import { ProductObject } from "../components/ProductCard";
import { Table } from "../components/Table";
import { CategoryObject, Category } from '../components/Category';
import { useForm } from "../hooks/useForm";
import Swal from "sweetalert2";

interface FormState {
    name: string;
    description: string;
    category: string;
    price: string;
}

const initialState = {
    name: '',
    description: '',
    category: '',
    price: ''
}

export const ProductsPage = () => {

    const [data, setData] = useState<ProductObject[]>([]);
    const [dataCategories, setDataCategories] = useState<CategoryObject[]>([]);
    const [dataProduct, setDataProduct] = useState<ProductObject[]>([]);
    const [saved, setSaved] = useState(false);
    const [labelButton, setLabelButton] = useState('Guardar');
    const [idProduct, setIdProduct] = useState<string | null>(null);
    const thead = ["Nombre", "Descripcion", "Categoria", "Precio"];
    
    const { formState, name, description, category, price, onInputChange, setFormState } = useForm(initialState);
    
    const obtenerData = async() => {
        
        setData( await getAllProducts() );
        setDataCategories( await getAllCategories() );
    }

    const editarData = async( id: string ) => {

        setDataProduct( await getProduct( id ) );
        setIdProduct( id );
    }

    const guardarProducto = async() => {

        let complete = false;
        
        if( labelButton === 'Guardar' ){
            
            const { ok }:any = await savingNewProduct( formState );
            complete = ok
        }else if( labelButton === 'Actualizar' ){

            const { ok }:any = await updatingProduct( formState, idProduct );
            complete = ok
        }else{

            complete = false;
        }

        if( complete ){
            Swal.fire({
                icon: 'success',
                title: 'Se guardo el producto',
                showConfirmButton: false,
                timer: 2500
            });
            setFormState( initialState );
            setSaved(!saved);

            if( labelButton === 'Actualizar' ){
                setLabelButton('Guardar');
            }
            
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Ocurrio un error al momento de guardar',
                showConfirmButton: false,
                timer: 2500
            });
        }

    }

    const eliminarProducto = async( id: string ) => {

        await deleteProduct( id );
        setSaved(!saved);
    }

    const confirmDeleteProduct = ( id: string ) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {

                Swal.fire({
                    icon: 'success',
                    title: 'Se elimino el producto',
                    showConfirmButton: false,
                    timer: 2500
                });
                
                
                eliminarProducto( id );                   
            }
          });
    }
    
    useEffect(() => {
        obtenerData();
    }, [ saved ]);

    useEffect(() => {
        
        if( dataProduct.length > 0 ){

            setFormState({
                name: dataProduct[0].name,
                description: dataProduct[0].description,
                category: dataProduct[0].category_id,
                price: dataProduct[0].price,
            });

            setLabelButton('Actualizar');
        }
    }, [ dataProduct ]);

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
                        <button onClick={ guardarProducto } className="bg-blue-600 text-white p-2 rounded">{ labelButton }</button>
                    </div>

                    <div className="mt-7">
                        <Table thead={ thead } data={ data } editarData= { editarData } confirmDeleteProduct={ confirmDeleteProduct } />
                    </div>

                </div>
            </ShoppingLayout>
        </>
    )
}
