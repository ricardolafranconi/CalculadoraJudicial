import { useState, useEffect } from 'react';
import axios from 'axios';

export function useUnidadEconomica() {
    const [unidadEconomica, setUnidadEconomica] = useState("");

    useEffect(() => {
        axios.get('/api/unidadEconomica')  // Make sure this URL is correct
            .then(response => {
                console.log('useUnidadEconomica response:', response.data);  // Log the entire response
                if (response.data.unidadesEconomicas) {
                    const unidadEconomicaNumber = Number(response.data.unidadesEconomicas.replace(/\$|\./g, '').replace(',', '.'));
                    if (isNaN(unidadEconomicaNumber)) {
                        console.log('Unidad Economica value is not a valid number:', response.data.unidadesEconomicas);
                        setUnidadEconomica("");  // Set to empty string if not a valid number
                    } else {
                        setUnidadEconomica(unidadEconomicaNumber);
                    }
                } else {
                    console.log('Unidad Economica value is null or undefined:', response.data.unidadesEconomicas);
                    setUnidadEconomica("");  // Set to empty string if null or undefined
                }
            })
            .catch(error => console.error('Error fetching Unidad Economica value:', error));
    }, []);

    return unidadEconomica;
}