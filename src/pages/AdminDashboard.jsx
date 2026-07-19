import { useEffect, useState,useCallback } from "react";
import AdminSidebar from "../components/AdminSidebar";
import api from "../api/axios";

function AdminDashboard() {

    const token = localStorage.getItem("token");

    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);


  const fetchData = useCallback(async () => {

    try {

        const [p, o, u] = await Promise.all([
            api.get("/admin/products", {
                headers: { Authorization: `Bearer ${token}` }
            }),
            api.get("/admin/orders", {
                headers: { Authorization: `Bearer ${token}` }
            }),
            api.get("/admin/users", {
                headers: { Authorization: `Bearer ${token}` }
            })
        ]);

        setProducts(p.data);
        setOrders(o.data);
        setUsers(u.data);

    } catch (err) {
        console.log(err);
    }

}, [token]);
useEffect(() => {
    fetchData();
}, [fetchData]);
   return (

    <div className="container-fluid">

        <div className="row">

            {/* Sidebar */}
            <div className="col-md-2 p-0">
                <AdminSidebar />
            </div>

            {/* Contenu */}
            <div className="col-md-10 p-4">

                <h2>Admin Dashboard</h2>

                <hr />

                <h4>Produits : {products.length}</h4>
                <h4>Commandes : {orders.length}</h4>
                <h4>Utilisateurs : {users.length}</h4>

            </div>

        </div>

    </div>

);
}

export default AdminDashboard;