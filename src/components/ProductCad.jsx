import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartCount, setCartCount] = useState(0);

    const token = localStorage.getItem("token");

    const getCart = async () => {

        if (!token) {
            setCartCount(0);
            return;
        }

        try {

            const res = await api.get("/cart", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const total = res.data.products.reduce(
                (sum, item) => sum + item.quantity,
                0
            );

            setCartCount(total);

        } catch (err) {
            console.log(err);
            setCartCount(0);
        }

    };

    useEffect(() => {
        getCart();
    }, [token]);

    return (
        <CartContext.Provider
            value={{
                cartCount,
                getCart,
                setCartCount
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);