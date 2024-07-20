import { useRef, useState } from "react";
import { ShoppingLayout } from "../layout/ShoppingLayout"
import { savingUsersCSV } from "../store/shopping/thunks";
import Swal from "sweetalert2";

export const UploadUsersPage = () => {

    const fileInputRef = useRef<any>();
    const [archivo, setArchivo] = useState([]);

    const onFileInputChange = ({ target }:any) => {
        
        if( target.files === 0 ) return;
        
        setArchivo(target.files);
        
    }

    const cargarUsers = async() => {

        const { ok, message } = await savingUsersCSV( archivo );

        if( ok ){
            Swal.fire({
                icon: 'success',
                title: message,
                showConfirmButton: false,
                timer: 2500
            });
            
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Ocurrio un error al momento de guardar',
                showConfirmButton: false,
                timer: 2500
            });
        }
    }

    return (
        <>
            <ShoppingLayout>
                <div className="mt-36 pl-10 pr-10">
                    <div className="mt-8 grid grid-cols-2 gap-6 items-start">
                        <div className="grid grid-cols-1 gap-6">
                            <label className="block">
                                <span className="text-gray-700">Cargar Usuarios</span>
                                <input type="file" onChange={ onFileInputChange } className="mt-1 block w-full" ref={ fileInputRef } />
                            </label>
                        </div>
                    </div>

                    <div className="mt-7 flex justify-start">
                        <button onClick={ cargarUsers } className="bg-blue-600 text-white p-2 rounded">Cargar</button>
                    </div>
                </div>
            </ShoppingLayout>
        </>
    )
}
