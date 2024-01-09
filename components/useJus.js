// useJus.js
import { useState, useEffect } from 'react';
import axios from 'axios';  // Make sure to install axios with `npm install axios`

export function useJus() {
    const [jus, setJus] = useState(null);

    useEffect(() => {
        axios.get('/api/jus')  // Adjust the URL to match your server-side function
            .then(response => {
                if (response.data.jus) {
                    const jusNumber = Number(response.data.jus.replace(/\$|\./g, '').replace(',', '.'));
                    if (isNaN(jusNumber)) {
                        console.log('Jus value is not a valid number:', response.data.jus);
                    } else {
                        setJus(jusNumber);  // Convert to cents
                    }
                } else {
                    console.log('Jus value is null or undefined:', response.data.jus);
                }
            })
            .catch(error => console.error('Error fetching jus value:', error));
    }, []);

    return jus;
}