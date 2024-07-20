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

export const getCategory = async( id ) => {

    const url = `https://proyectoeasy.net/prueba_tecnica_helpeople/api/categories/${ id }`;

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

export const getProduct = async( id ) => {

    const url = `https://proyectoeasy.net/prueba_tecnica_helpeople/api/products/${ id }`;

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

export const updatingProduct = async( product, idProduct ) => {

    const url = `https://proyectoeasy.net/prueba_tecnica_helpeople/api/products/${ idProduct }`;
    
    const formTypes = {
        name_product: product.name,
        description_product: product.description,
        price_product: product.price,
        category_product: product.category
    }

    try{
        const { data } = await axios.put(url, formTypes);
        
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

export const deleteProduct = async( idProduct ) => {

    const url = `https://proyectoeasy.net/prueba_tecnica_helpeople/api/products/${ idProduct }`;
    
    try{
        const { data } = await axios.delete(url);
        
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

export const savingNewCategory = async( category ) => {

    const url = `https://proyectoeasy.net/prueba_tecnica_helpeople/api/categories/`;

    const formTypes = {
        name_category: category.name,
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

export const updatingCategory = async( category, idCategory ) => {

    const url = `https://proyectoeasy.net/prueba_tecnica_helpeople/api/categories/${ idCategory }`;
    
    const formTypes = {
        name_category: category.name,
    }

    try{
        const { data } = await axios.put(url, formTypes);
        
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

export const deleteCategory = async( idCategory ) => {

    const url = `https://proyectoeasy.net/prueba_tecnica_helpeople/api/categories/${ idCategory }`;
    
    try{
        const { data } = await axios.delete(url);
        
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