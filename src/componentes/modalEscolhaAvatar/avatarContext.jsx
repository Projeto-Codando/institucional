import React, { createContext, useState, useEffect } from 'react';
import api from '../../api';

export const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
    const [avatares, setAvatares] = useState([]);

    useEffect(() => {
        const fetchAvatars = async () => {
            try {
                console.log("Attempting to fetch avatars...");
                const token = sessionStorage.getItem("token");
                if (!token) {
                    console.error("No token found in session storage");
                    return;
                }

                console.log("Token found, making API request...");
                const response = await api.get('/avatares', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAvatares(response.data);
                console.log("Avatares fetched successfully:", response.data);
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
