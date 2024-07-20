import noImage from "../assets/no-image.jpg";
import { ProductButtons } from "./ProductButtons";

export const ProductShop = () => {
    return (
        <div className="w-full mt-10 flex justify-center items-center">
            <div className="border border-slate-400 rounded w-3/4 flex shadow-xl">
                <div className="rounded w-1/2 flex justify-center items-center p-5">
                    <img 
                        className="size-60 rounded" 
                        src={ noImage } 
                        alt="Product Image"
                    />
                </div>

                <div className="rounded w-1/2 flex justify-start items-center flex-col pt-10">
                    <span className="text-neutral-800">SmartPhone</span>
                    <span className="text-4xl">Iphone 15 pro</span>
                    <span className="mt-5 text-neutral-800">Celular iphone 15 pro de apple</span>
                    <span className="mt-5 text-neutral-800">$1000</span>
                    <ProductButtons />
                </div>
            </div>
        </div>
    )
}
