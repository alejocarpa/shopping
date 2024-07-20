import axios from "axios";

export const getAllCategories = async() => {

    const url = `https://proyectoeasy.net/prueba_tecnica_helpeople/api/categories`;

    try{
        const { data } = await axios.get(url);
        
        if(data.status === 200){
            return data.results;
        }else{
            return [];
        }
    }catch(error){
        return [];
    }
}

export const getAllProducts = async() => {

    const url = `https://proyectoeasy.net/prueba_tecnica_helpeople/api/products/`;

    try{
        const { data } = await axios.get(url);
        
        if(data.status === 200){
            return data.results;
        }else{
            return [];
        }
    }catch(error){
        return [];
    }
}

export const savingNewProduct = async( product ) => {

    const url = `https://proyectoeasy.net/prueba_tecnica_helpeople/api/products/`;

    const formTypes = {
        name_product: product.name,
        description_product: product.description,
        price_product: product.price,
        category_product: product.category
    }

    try{
        const { data } = await axios.post(url, formTypes);
        
        if(data.status === 200){
            return {
                ok: true
            }
        }else{
            return {
                ok: false
            }
        }
    }catch(error){
        return [];
    }
}