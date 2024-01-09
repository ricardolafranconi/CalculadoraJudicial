import { useState, useEffect } from 'react';
import axios from 'axios';

export function useUnidadEconomica() {
    const [unidadEconomica, setUnidadEconomica] = useState(null);

    useEffect(() => {
        axios.get('/api/unidadEconomica')  // Adjust the URL to match your server-side function
            .then(response => {
                const unidadEconomicaValue = response.data.unidadesEconomicas;  // Adjust this line
                const formattedValue = Number(unidadEconomicaValue.replace(/\$|\./g, '').replace(',', '.'));
                setUnidadEconomica(formattedValue);
                console.log(formattedValue);
            })
            .catch(error => {
                console.error('Error fetching unidad economica:', error);
            });
    }, []);

    return unidadEconomica;
}