import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../api/axios";

const CartContext = createContext();


export function CartProvider({children}) {

    const [cartCount, setCartCount] = useState(0);

    const token = localStorage.getItem("token");


    const getCart = useCallback(async()=>{

        try {


            if(!token){

                setCartCount(0);
                return;

            }



            const res = await api.get("/cart",{

                headers:{
                    Authorization:`Bearer ${token}`
                }

            });



            // selon la réponse backend
            const products = res.data.cart?.products || [];



            const total = products.reduce(

                (sum,item)=> sum + item.quantity,

                0

            );



            setCartCount(total);



        }catch(err){

            console.log(
                "CART CONTEXT ERROR:",
                err.response?.data || err.message
            );

        }


    },[token]);





    useEffect(()=>{

        getCart();

    },[getCart]);





    return (

        <CartContext.Provider

            value={{
                cartCount,
                getCart
            }}

        >

            {children}

        </CartContext.Provider>

    );


}



export function useCart(){

    return useContext(CartContext);

}