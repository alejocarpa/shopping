import { useEffect, useState } from 'react';

export const useForm = <T extends Object>( initialForm: T ) => {

    const [ formState, setFormState ] = useState( initialForm );
    
    const onInputChange = ({ target }:any) => {
        
        const { name, value } = target;
        
        setFormState({
            ...formState,
            [ name ]: value
        });
        
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    useEffect(() => {
        setFormState( initialForm );
    }, [])

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

    }
}