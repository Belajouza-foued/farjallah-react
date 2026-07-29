import { useEffect, useState,useCallback } from "react";
import api from "../api/axios";
import "../styles/Dashboard.css";
import AdminSidebar from "../components/AdminSidebar";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";


function Dashboard() {


    const [stats, setStats] = useState({});

    const [sales, setSales] = useState([]);

    const [bestProducts, setBestProducts] = useState([]);

    const [orders, setOrders] = useState([]);

    const [stockAlerts, setStockAlerts] = useState([]);
const [invoices,setInvoices]=useState([]);

    const token = localStorage.getItem("token");


    // =========================
    // DASHBOARD STATS
    // =========================

   const getDashboard = useCallback(async () => {

    try {

        const res = await api.get("/admin/dashboard", {

            headers:{
                Authorization:`Bearer ${token}`
            }

        });

        setStats(res.data);


    } catch(err){

        console.log(err);

    }

}, [token]);
    // =========================
    // SALES CHART
    // =========================
// =========================
// SALES CHART
// =========================

const getSalesChart = useCallback(async () => {

    try {

        const res = await api.get("/admin/sales-chart", {

            headers:{
                Authorization:`Bearer ${token}`
            }

        });


        const data = res.data.map(item => ({

            month:`Mois ${item._id.month}`,

            sales:item.totalSales,

            orders:item.totalOrders

        }));


        setSales(data);


    } catch(err){

        console.log(err);

    }


}, [token]); 
       const getInvoices = async()=>{

 try{

 const token=localStorage.getItem("token");


 const res = await api.get("/admin/invoices",
 {
 headers:{
 Authorization:`Bearer ${token}`
 }
 });


 setInvoices(res.data.invoices);


 }catch(error){

 console.log(error);

 }

};
useEffect(()=>{

 getInvoices();

},[]); 
    // =========================
    // BEST PRODUCTS
    // =========================

   const getBestProducts = useCallback(async () => {

    try {

        const res = await api.get("/admin/best-products", {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });


        setBestProducts(res.data);


    } catch (err) {

        console.log(err);

    }

}, [token]);
    // =========================
    // LAST ORDERS
    // =========================

  const getLatestOrders = useCallback(async () => {

    try {

        const res = await api.get("/admin/latest-orders", {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });


        setOrders(res.data);


    } catch (err) {

        console.log(err);

    }


}, [token]);
    // =========================
    // STOCK ALERTS
    // =========================

   const getStockAlerts = useCallback(async () => {

    try {

        const res = await api.get("/admin/stock-alerts", {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });


        setStockAlerts(res.data);


    } catch (err) {

        console.log(err);

    }


}, [token]);
 useEffect(() => {

    getDashboard();

    getSalesChart();

    getBestProducts();

    getLatestOrders();

    getStockAlerts();


}, [
    getDashboard,
    getSalesChart,
    getBestProducts,
    getLatestOrders,
    getStockAlerts
]);

return (

<div className="container-fluid">

    <div className="row">

        {/* ================= SIDEBAR ================= */}

        <div className="col-lg-2 col-md-3 p-0">
            <AdminSidebar />
        </div>

        {/* ================= CONTENT ================= */}

        <div className="col-lg-10 col-md-9 p-4">

            <h2 className="mb-4 fw-bold">
                Dashboard Administration
            </h2>

            <div className="row g-4">

                {/* CHIFFRE D'AFFAIRES */}

                <div className="col-xl-4 col-md-6">

                    <div className="dashboard-card card-blue text-center">

                        <i className="bi bi-cash-stack dashboard-icon"></i>

                        <p>Chiffre d'affaires</p>

                        <h2>{stats.revenue || 0} DT</h2>

                    </div>

                </div>

                {/* PRODUITS */}

                <div className="col-xl-4 col-md-6">

                    <div className="dashboard-card card-yellow text-center">

                        <i className="bi bi-box-seam dashboard-icon"></i>

                        <p>Produits</p>

                        <h2>{stats.totalProducts || 0}</h2>

                    </div>

                </div>

                {/* COMMANDES */}

                <div className="col-xl-4 col-md-6">

                    <div className="dashboard-card card-navy text-center">

                        <i className="bi bi-cart-check dashboard-icon"></i>

                        <p>Commandes</p>

                        <h2>{stats.totalOrders || 0}</h2>

                    </div>

                </div>

                {/* CLIENTS */}

                <div className="col-xl-4 col-md-6">

                    <div className="dashboard-card card-white text-center">

                        <i className="bi bi-people dashboard-icon text-primary"></i>

                        <p>Clients</p>

                        <h2>{stats.totalUsers || 0}</h2>

                    </div>

                </div>

                {/* RUPTURE */}

                <div className="col-xl-4 col-md-6">

                    <div className="dashboard-card card-white text-center">

                        <i className="bi bi-exclamation-triangle dashboard-icon text-danger"></i>

                        <p>Rupture stock</p>

                        <h2>{stats.outOfStock || 0}</h2>

                    </div>

                </div>

                {/* STOCK FAIBLE */}

                <div className="col-xl-4 col-md-6">

                    <div className="dashboard-card card-white text-center">

                        <i className="bi bi-bar-chart-line dashboard-icon text-warning"></i>

                        <p>Stock faible</p>

                        <h2>{stats.lowStock || 0}</h2>

                    </div>

                </div>

                {/* BAR CHART */}

                <div className="col-12">

                    <div className="dashboard-card">

                        <h4 className="mb-3">
                            📊 Ventes mensuelles
                        </h4>

                        <ResponsiveContainer width="100%" height={350}>

                            <BarChart data={sales}>

                                <CartesianGrid strokeDasharray="3 3"/>

                                <XAxis dataKey="month"/>

                                <YAxis/>

                                <Tooltip/>

                                <Bar
                                    dataKey="sales"
                                    fill="#1455D6"
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

                {/* LINE CHART */}

                <div className="col-12">

                    <div className="dashboard-card">

                        <h4 className="mb-3">

                            📈 Evolution du chiffre d'affaires

                        </h4>

                        <ResponsiveContainer width="100%" height={350}>

                            <LineChart data={sales}>

                                <CartesianGrid strokeDasharray="3 3"/>

                                <XAxis dataKey="month"/>

                                <YAxis/>

                                <Tooltip/>

                                <Line

                                    type="monotone"

                                    dataKey="sales"

                                    stroke="#0B2545"

                                    strokeWidth={3}

                                />

                            </LineChart>

                        </ResponsiveContainer>

                    </div>

                </div>

                {/* BAS DU DASHBOARD */}

                <div className="col-lg-4">

                    <div className="dashboard-card h-100">

                        <h4 className="mb-3">
                            🔥 Produits les plus vendus
                        </h4>

                        {

                            bestProducts.map(item => (

                                <div
                                    key={item._id}
                                    className="d-flex justify-content-between border-bottom py-2"
                                >

                                    <span className="span-dash">

                                        {item.product?.[0]?.name}

                                    </span>

                                    <strong className="strong-dash">

                                        {item.totalSold}

                                    </strong>

                                </div>

                            ))

                        }

                    </div>

                </div>

                <div className="col-lg-4">

                    <div className="dashboard-card h-100">

                        <h4 className="mb-3">

                            🕒 Dernières commandes

                        </h4>

                        {

                            orders.map(order => (

                                <div
                                    key={order._id}
                                    className="border-bottom py-2"
                                >

                                    <strong className="strong-dash">

                                        {order.user?.name || "Client"}

                                    </strong>

                                    <br/>
<span className="span-dash">
                                    {order.total} DT
                                    </span>

                                </div>

                            ))

                        }

                    </div>

                </div>

                <div className="col-lg-4">

                    <div className="dashboard-card h-100">

                        <h4 className="mb-3">

                            ⚠️ Alertes stock

                        </h4>

                        {

                            stockAlerts.map(product => (

                                <div
                                    key={product._id}
                                    className="d-flex justify-content-between border-bottom py-2"
                                >

                                    <span className="span-dash">

                                        {product.name}

                                    </span>

                                    <span className="badge bg-danger">

                                        {product.stock}

                                    </span>

                                </div>

                            ))

                        }

                    </div>

                </div>
         

            </div>
            
<div className="card mt-4">

  <h3>Dernières factures</h3>

  {invoices.map((invoice) => (

    <div key={invoice._id} className="border-bottom py-2">

      <p>
        <strong>Facture :</strong> {invoice.invoiceNumber}
      </p>

      <p>
        <strong>Client :</strong>{" "}
        {invoice.customer
          ? `${invoice.customer.firstName} ${invoice.customer.lastName}`
          : "Client non disponible"}
      </p>

      <p>
        <strong>Total :</strong> {invoice.total} DT
      </p>

    </div>

  ))}

</div>
        </div>

    </div>

</div>

);

}


export default Dashboard;