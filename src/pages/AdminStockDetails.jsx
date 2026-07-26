import { useEffect, useState,useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";


function AdminStockDetails(){

    const { id } = useParams();

    const [product,setProduct] = useState(null);
    const [stock,setStock] = useState("");

    const token = localStorage.getItem("token");
const getProduct = useCallback(async()=>{

    try{

        const res = await api.get(
            `/admin/stock/${id}`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );


        setProduct(res.data);
        setStock(res.data.stock);


    }catch(err){

        console.log(
            err.response?.data || err.message
        );

    }


},[id, token]);


useEffect(()=>{

    getProduct();

},[getProduct]);

  
    const updateStock = async()=>{

        try{


            await api.put(
                `/admin/stock/${id}`,
                {
                    stock
                },
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );


            alert("Stock modifié");


            getProduct();


        }catch(err){

            console.log(err);

        }

    };



    if(!product){

        return <h3>Chargement...</h3>;

    }



    return(

        <div className="container mt-4">


            <h2>
                Modifier Stock
            </h2>


            <img
            src={`http://localhost:5000/uploads/${product.images[0]}`}
            width="150"
            alt={product.name}
            />


            <h3>
                {product.name}
            </h3>


            <p>
                SKU : {product.sku}
            </p>


            <p>
                Stock actuel : {product.stock}
            </p>



            <input
            type="number"
            className="form-control w-25"
            value={stock}
            onChange={(e)=>setStock(e.target.value)}
            />



            <button
            className="btn btn-primary mt-3"
            onClick={updateStock}
            >
                Enregistrer
            </button>


        </div>


    );


}


export default AdminStockDetails;