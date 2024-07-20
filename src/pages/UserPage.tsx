import Swal from "sweetalert2";
import { useForm } from "../hooks/useForm";
import { ShoppingLayout } from "../layout/ShoppingLayout"
import { savingNewUser } from "../store/shopping/thunks";

const initialState = {
    name: '',
    email: '',
    password: '',
}

export const UserPage = () => {

    const { formState, name, email, password, onInputChange, setFormState } = useForm(initialState);

    const guardarUsuario = async() => {

        const { ok }:any = await savingNewUser( formState );

        if( ok ){
            Swal.fire({
                icon: 'success',
                title: 'Se creo el usuaro correctamente',
                showConfirmButton: false,
                timer: 2500
            });
            setFormState( initialState );
            
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
        <ShoppingLayout>
            <div className="mt-36 pl-10 pr-10">
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="grid grid-cols-1 gap-6">
                        <label className="block">
                            <span className="text-gray-700">Nombre</span>
                            <input type="text" name="name" value={ name } onChange={ onInputChange } className="form-input mt-1 block w-full border-2 rounded p-1" />
                        </label>
                        <label className="block">
                        <span className="text-gray-700">Email</span>
                        <input type="text" name="email" value={ email } onChange={ onInputChange } className="form-input mt-1 block w-full border-2 rounded p-1" />
                        </label>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        <label className="block">
                            <span className="text-gray-700">Password</span>
                            <input type="password" name="password" value={ password } onChange={ onInputChange } className="form-input mt-1 block w-full border-2 rounded p-1" />
                        </label>
                    </div>
                </div>

                <div className="mt-7 flex justify-center">
                    <button onClick={ guardarUsuario } className="bg-blue-600 text-white p-2 rounded">Guardar</button>
                </div>
            </div>
        </ShoppingLayout>
    )
}
