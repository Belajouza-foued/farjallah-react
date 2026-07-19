import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import AdminSidebar from "../components/AdminSidebar";
import { useNavigate } from "react-router-dom";
import "../styles/AdminOrders.css";

function AdminOrders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    // GET ORDERS
    const fetchOrders = useCallback(async () => {

        setLoading(true);
        setErrorMsg("");

        try {

            const res = await api.get("/admin/orders", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setOrders(res.data);

        } catch (err) {

            console.log(err);
            setErrorMsg("Impossible de charger les commandes.");

        } finally {

            setLoading(false);

        }

    }, [token]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    // UPDATE STATUS
    const updateStatus = async (id, status) => {

        try {

            await api.put(
                `/admin/orders/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            fetchOrders();

        } catch (err) {

            console.log(err);

        }

    };

    const statusBadgeClass = (status) => {
        switch (status) {
            case "paid":
                return "ao-badge ao-badge--success";
            case "shipped":
                return "ao-badge ao-badge--info";
            case "cancelled":
                return "ao-badge ao-badge--danger";
            default:
                return "ao-badge ao-badge--warning";
        }
    };

    return (

        <div className="container-fluid admin-orders">
            <div className="row">

                {/* SIDEBAR */}
                <div className="col-md-2 p-0">
                    <AdminSidebar />
                </div>

                {/* CONTENT */}
                <div className="col-md-10 p-4">

                    <div className="admin-orders__head">
                        <h2 className="admin-orders__title">
                            <span className="admin-orders__title-icon">📦</span>
                            Commandes
                        </h2>
                        <span className="admin-orders__count">
                            {orders.length} commande{orders.length > 1 ? "s" : ""}
                        </span>
                    </div>

                    {errorMsg && (
                        <div className="ao-alert">{errorMsg}</div>
                    )}

                    <div className="admin-orders__table-wrap">
                        <table className="table admin-orders__table">

                            <thead className="table-dark">
                                <tr>
                                    <th>User Email</th>
                                    <th>Date</th>
                                    <th>name</th>
                                    <th>images</th>
                                    <th>Products</th>
                                    <th>Paiement</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Change Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                {loading && (
                                    <tr>
                                        <td colSpan="9" className="admin-orders__empty">
                                            Chargement des commandes...
                                        </td>
                                    </tr>
                                )}

                                {!loading && orders.length === 0 && (
                                    <tr>
                                        <td colSpan="9" className="admin-orders__empty">
                                            Aucune commande pour le moment.
                                        </td>
                                    </tr>
                                )}

                                {!loading && orders.map(order => (

                                    <tr key={order._id}>

                                        {/* EMAIL */}
                                        <td>{order.user?.email}</td>

                                        {/* DATE */}
                                        <td>
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>

                                        {/* NAME */}
                                        <td>
                                            {order.products.map((item) => (
                                                <div key={item._id}>
                                                    {item.product?.name}
                                                </div>
                                            ))}
                                        </td>

                                        {/* IMAGES */}
                                        <td>
                                            {order.products.map((item) => (
                                                <div
                                                    key={item._id}
                                                    className="admin-orders__product"
                                                >
                                                    <img
                                                        src={`http://localhost:5000/uploads/${item.product?.images?.[0]}`}
                                                        width="40"
                                                        height="40"
                                                        className="admin-orders__product-img"
                                                        alt={item.product?.name || "produit"}
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src =
                                                                "https://via.placeholder.com/40x40?text=%20";
                                                        }}
                                                    />
                                                    <span>{item.product?.name}</span>
                                                </div>
                                            ))}
                                        </td>

                                        {/* PRODUCTS (quantity) */}
                                        <td>
                                            {order.products.map((item) => (
                                                <div key={item._id} className="admin-orders__qty">
                                                    {item.quantity}
                                                </div>
                                            ))}
                                        </td>

                                        {/* PAYMENT STATUS */}
                                        <td>
                                            <span
                                                className={`ao-badge ${
                                                    order.paymentStatus === "paid"
                                                        ? "ao-badge--success"
                                                        : "ao-badge--danger"
                                                }`}
                                            >
                                                {order.paymentStatus}
                                            </span>
                                        </td>

                                        {/* TOTAL */}
                                        <td className="admin-orders__total">
                                            {order.total} DT
                                        </td>

                                        {/* STATUS */}
                                        <td>
                                            <span className={statusBadgeClass(order.status)}>
                                                {order.status}
                                            </span>
                                        </td>

                                        {/* CHANGE STATUS */}
                                        <td>
                                            <select
                                                className="form-select admin-orders__select"
                                                value={order.status}
                                                onChange={(e) => updateStatus(order._id, e.target.value)}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="paid">Paid</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>

                                        {/* ACTION */}
                                        <td>
                                            <button
                                                className="admin-orders__btn-view"
                                                onClick={() => navigate(`/admin/orders/${order._id}`)}
                                            >
                                                Voir
                                            </button>
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>
                    </div>

                </div>

            </div>
        </div>

    );
}

export default AdminOrders;