import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useState,useEffect } from "react";

function OrderDetails() {

    const { id } = useParams();
    const [order, setOrder] = useState(null);
    useEffect(() => {

    const getOrder = async () => {

        const token = localStorage.getItem("token");

        const res = await api.get(`/admin/orders/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setOrder(res.data);
    };

    getOrder();

}, [id]);
if (!order) {
    return <h3>Chargement...</h3>;
}
 
return (
    <div className="container mt-5">

        <h2>Détails de la commande</h2>

        <p><strong>Client :</strong> {order.user.name}</p>

        <p><strong>Email :</strong> {order.user.email}</p>

        <p><strong>Total :</strong> {order.total} DT</p>

        <p><strong>Paiement :</strong> {order.paymentStatus}</p>

        <p><strong>Statut :</strong> {order.status}</p>

        <table className="table">

            <thead>
                <tr>
                    <th>Image</th>
                    <th>Produit</th>
                    <th>Prix</th>
                    <th>Quantité</th>
                </tr>
            </thead>

            <tbody>

                {order.products.map((item) => (

                    <tr key={item._id}>

                        <td>
                            <img
                                src={`http://localhost:5000/uploads/${item.product.images[0]}`}
                                width="60"
                                alt={item.product.name}
                            />
                        </td>

                        <td>{item.product.name}</td>

                        <td>{item.product.price} DT</td>

                        <td>{item.quantity}</td>

                    </tr>

                ))}

            </tbody>

        </table>

    </div>
);
}

export default OrderDetails;