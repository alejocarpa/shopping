import { ReactElement } from "react";
import { Navbar } from "../components/Navbar";

export const ShoppingLayout = ({ children }:{ children?: ReactElement | ReactElement[]; }) => {
    return (
        <>
            <Navbar />
            { children }
        </>
    )
}
