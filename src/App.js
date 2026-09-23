import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
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
import Services from "./components/ServicesPage";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import AdminInvoices from "./pages/AdminInvoices";
import AdminDeliveryNotes from "./pages/AdminDeliveryNotes";
import AdminVehicles from "./pages/AdminVehicles";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


function App() {
  return (
    <BrowserRouter>
     <CartProvider>
      <TopBar/>
     <Navbar />

      <Routes>
         <Route path="/" element={<Home />}/>
                <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />}/>
                <Route path="/products" element={<Products />} /> 
          <Route path="/cart" element={<Cart />} />
                    <Route path="/success" element={<Success />} />
           <Route path="/admin" element={<AdminDashboard />} />
           <Route  path="/admin/add/product" element={<AddProduct />}/>
           <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/users" element={<AdminProducts />} />         
           <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/stock" element={<AdminStock/>} />
            <Route path="/admin/stock/:id" element={<AdminStockDetails/>} />
            <Route path="/admin/orders/:id" element={<OrderDetails />}/>
             <Route path="/product/:id" element={<AdminStockDetails/>} />
           <Route path="/Dashboard" element={<Dashboard />}/>
           <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/services" element={<Services />}/>
                     <Route path="/adminInvoices" element={<AdminInvoices />}/>
                     <Route  path="/admin/vehicles"  element={<AdminVehicles />}
                    
/>
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>
                     <Route 
 path="/adminDeliveryNotes" 
 element={<AdminDeliveryNotes />}
/>
           <Route 
  path="/categorie/:slug" 
  element={<CategoryProducts />}
/>          
     </Routes>
       <Footer />
     </CartProvider>
    </BrowserRouter>
  );
}

export default App;