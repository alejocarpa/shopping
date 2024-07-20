
import { useDispatch } from "react-redux";
import { ShoppingLayout } from "../layout/ShoppingLayout";
import { useAppSelector } from "../store/hooks";
import { savingNewCompra } from "../store/shopping/thunks";
import Swal from "sweetalert2";
import { cleanCart, updateCredit } from "../store/shopping/shoppingSlice";

export const CartPage = () => {

    const { productsInCart, initialCredit } = useAppSelector( (state) => state.shopping );
    const dispatch = useDispatch();

    let precioTotal = 0;

    const iniciarCompra = async() => {

        const { ok, message, newCredit }:any = await savingNewCompra( precioTotal, initialCredit );
        
        if( ok ){
            Swal.fire({
                icon: 'success',
                title: message,
                showConfirmButton: false,
                timer: 2500
            });

            dispatch( updateCredit({ newCredit }) );
            dispatch( cleanCart() );
        }else{
            Swal.fire({
                icon: 'error',
                title: message,
                showConfirmButton: false,
                timer: 2500
            });
        }
    }

    return (
        <>
            <ShoppingLayout>
                <div className="mt-36 pl-10 pr-10">
                    
                        {
                            productsInCart.length > 0
                            &&
                            productsInCart.map( product => {

                                precioTotal += product.quantity! * parseFloat( product.price );
 
                                return <div key={ product.id } className="border-2 rounded p-8 flex flex-col mt-3">
                                    <div className="flex justify-between items-center"  >
                                        <div>
                                            { product.name }
                                        </div>
                                        <div>
                                            { '$'+product.price }
                                        </div>
                                        <div>
                                            { product.quantity }
                                        </div>
                                        <div>
                                            Total: { product.quantity! * parseFloat( product.price ) }
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                        <div className="flex justify-end items-center mt-5 pr-10">
                            <div className="text-xl">
                                Total Carrito: { precioTotal }
                            </div>
                        </div>
                        <div className="flex justify-end items-center mt-5 pr-10">
                            <div className="text-xl">
                                Tu Credito es: { initialCredit }
                            </div>
                        </div>
                        <div className="mt-7 flex justify-end">
                            <button onClick={ iniciarCompra } className="bg-blue-600 text-white p-2 rounded">Pagar</button>
                        </div>
                        
                </div>
            </ShoppingLayout>
        </>
    )
}
