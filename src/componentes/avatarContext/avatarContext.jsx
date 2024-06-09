import React, { createContext, useState, useEffect } from 'react';
import api from '../../api';

export const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
    const [avatares, setAvatares] = useState([]);

    useEffect(() => {
        const fetchAvatars = async () => {
            try {
                const token = sessionStorage.getItem("token");
                if (!token) {
                    console.error("O token não foi encontrado!");
                    return;
                }

                console.log("Token encontrado!");
                const response = await api.get('/avatares', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAvatares(response.data);
                console.log("Avatares carregados:", response.data)
            } catch (error) {
                console.error("Error fetching avatars:", error);
            }
        };

        fetchAvatars();
    }, []);

    return (
        <AvatarContext.Provider value={avatares}>
            {children}
        </AvatarContext.Provider>
    );
};
