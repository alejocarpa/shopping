import { BrowserRouter, NavLink, Navigate, Route, Routes } from "react-router-dom";
import logo from '../logo.svg';
import { HomePage, ProductsPage, UserPage, CategoriesPage } from "../pages";

export const Navigation = () => {
    return (
        <BrowserRouter>            
            <Routes>                
                <Route path="/" element={ <HomePage /> } />
                <Route path="/products" element={ <ProductsPage /> } />
                <Route path="/categories" element={ <CategoriesPage /> } />
                <Route path="/user" element={ <UserPage /> } />
                <Route path="/*" element={ <Navigate to="/home" replace /> } />
            </Routes>
        </BrowserRouter>
    )
}
