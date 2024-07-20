import { ReactElement } from 'react';
import logo from '../logo.svg';
import { TbBrandCashapp } from "react-icons/tb";
import { FaShopify } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const OptionsMenu = ({ children }:{ children?: ReactElement | ReactElement[] }) => {
    return (
        <div className='pr-10 cursor-pointer flex'>
            { children }
        </div>
    )
}

export const Navbar = () => {

    const { initialCredit, productsInCart } = useAppSelector( (state) => state.shopping );
    

    return (
        <>
            <div className="flex fixed w-full h-24 bg-blue-600 text-white rounded-b-md top-0">
                <img src={ logo } alt="React logo"></img>
                <div className="w-full flex justify-end items-center pr-5">
                    <OptionsMenu>
                        <NavLink to="/" className={ ({ isActive }) => isActive ? 'underline decoration-solid' : '' }>Inicio</NavLink>
                    </OptionsMenu>
                    <OptionsMenu>
                        <NavLink to="/products" className={ ({ isActive }) => isActive ? 'underline decoration-solid' : '' }>Productos</NavLink>
                    </OptionsMenu>
                    <OptionsMenu>
                        <NavLink to="/user" className={ ({ isActive }) => isActive ? 'underline decoration-solid' : '' }>Mi cuenta</NavLink>
                    </OptionsMenu>
                    <OptionsMenu>
                        <TbBrandCashapp />
                        <a>{ initialCredit }</a>
                    </OptionsMenu>
                    <OptionsMenu>
                        <div className='relative'>
                            <FaShopify className='text-2xl' />
                            {
                                productsInCart.length > 0
                                &&
                                <div className='w-3 h-3 absolute bg-red-600 top-0 right-0 rounded-full'></div>
                            }
                            
                        </div>
                    </OptionsMenu>
                </div>
            </div>
        </>
    )
}
