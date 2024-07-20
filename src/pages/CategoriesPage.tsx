import { useEffect, useState } from "react";
import { ShoppingLayout } from "../layout/ShoppingLayout"
import { deleteCategory, deleteProduct, getAllCategories, getCategory, getProduct, savingNewCategory, savingNewProduct, updatingCategory, updatingProduct } from "../store/shopping/thunks";
import { Table } from "../components/Table";
import { CategoryObject, Category } from '../components/Category';
import { useForm } from "../hooks/useForm";
import Swal from "sweetalert2";

interface FormState {
    name: string;
}

const initialState = {
    name: '',
}

export const CategoriesPage = () => {

    const [data, setData] = useState<CategoryObject[]>([]);
    const [dataCategories, setDataCategories] = useState<CategoryObject[]>([]);
    const [dataCategory, setDataCategory] = useState<CategoryObject[]>([]);
    const [saved, setSaved] = useState(false);
    const [labelButton, setLabelButton] = useState('Guardar');
    const [idCategory, setIdCategory] = useState<string | null>(null);
    const thead = ["Nombre", "Fecha Creacion", "Fecha Modificacion"];
    
    const { formState, name, onInputChange, setFormState } = useForm(initialState);
    
    const obtenerData = async() => {
        
        setData( await getAllCategories() );
    }

    const editarData = async( id: string ) => {

        setDataCategory( await getCategory( id ) );
        setIdCategory( id );
    }

    const guardarProducto = async() => {

        let complete = false;
        
        if( labelButton === 'Guardar' ){
            
            const { ok }:any = await savingNewCategory( formState );
            complete = ok
        }else if( labelButton === 'Actualizar' ){

            const { ok }:any = await updatingCategory( formState, idCategory );
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

    const eliminarCategoria = async( id: string ) => {

        await deleteCategory( id );
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
                
                
                eliminarCategoria( id );                   
            }
          });
    }
    
    useEffect(() => {
        obtenerData();
    }, [ saved ]);

    useEffect(() => {
        
        if( dataCategory.length > 0 ){

            setFormState({
                name: dataCategory[0].name,
            });

            setLabelButton('Actualizar');
        }
    }, [ dataCategory ]);

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
                        </div>
                    </div>
                    <div className="mt-7 flex justify-center">
                        <button onClick={ guardarProducto } className="bg-blue-600 text-white p-2 rounded">{ labelButton }</button>
                    </div>

                    <div className="mt-7">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    {
                                        thead.map((th, index) => (
                                            <th scope="col" className="px-6 py-3" key={index}>
                                                {th}
                                            </th>
                                        ))
                                    }
                                    <th scope="col" className="px-6 py-3"></th>
                                    <th scope="col" className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.length > 0
                                    &&
                                    data.map(category => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={ category.id }>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {category.name}
                                            </td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {category.created_at}
                                            </td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {category.updated_at}
                                            </td>                                            
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <button onClick={ () => editarData( category?.id ) }>Editar</button>
                                            </td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <button onClick={ () => confirmDeleteProduct( category?.id ) }>Eliminar</button>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>

                </div>
            </ShoppingLayout>
        </>
    )
}
