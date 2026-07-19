import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Payment from "./pages/Payment"
import Success from "./pages/Success";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AddProduct from "./pages/AddProduct";
import AdminOrders from "./pages/AdminOrders";
import AdminStock from "./pages/AdminStock";
import OrderDetails from "./pages/OrederDetails";
import AdminStockDetails from "./pages/AdminStockDetails";
import Dashboard from "./pages/Dashboard";
import { CartProvider } from "./context/CartContext";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetails from "./pages/ProductDetails";
import Ser from "./pages/ProductDetails";


function App() {
  return (
    <BrowserRouter>
     <CartProvider>
     <Navbar />

      <Routes>
        <Route path="/" element={<Products />} /> 
        <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />}/>
                 <Route path="/home" element={<Home />}/>
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
           <Route path="/success" element={<Success />} />
           <Route path="/admin" element={<AdminDashboard />} />
           <Route  path="/admin/add/product" element={<AddProduct />}/>
           <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/users" element={<AdminProducts />} />
           <Route path="/admin/products/add" element={<AddProduct />} />
           <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/stock" element={<AdminStock/>} />
            <Route path="/admin/stock/:id" element={<AdminStockDetails/>} />
            <Route path="/admin/orders/:id" element={<OrderDetails />}/>
             <Route path="/product/:id" element={<AdminStockDetails/>} />
           <Route path="/Dashboard" element={<Dashboard />}/>
           <Route 
  path="/categorie/:slug" 
  element={<CategoryProducts />}
/>
           
     </Routes>
     </CartProvider>
    </BrowserRouter>
  );
}

export default App;