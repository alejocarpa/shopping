import { ProductObject } from "./ProductCard";

interface Props {
    thead: string[];
    data: ProductObject[];
    editarData: ( id: string ) => void;
    confirmDeleteProduct: ( id: string ) => void;
}

export const Table = ({ thead, data, editarData, confirmDeleteProduct }: Props) => {
    return (
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
                    data.map(product => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={ product.id }>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {product.name}
                            </td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {product.description}
                            </td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {product.name_category}
                            </td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {'$' + product.price}
                            </td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <button onClick={ () => editarData( product?.id ) }>Editar</button>
                            </td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <button onClick={ () => confirmDeleteProduct( product?.id ) }>Eliminar</button>
                            </td>
                        </tr>
                    ))
                }

            </tbody>
        </table>
    )
}
