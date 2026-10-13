import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import OrderSuccess from './pages/OrderSuccess';
import About from './pages/About';
import Disclaimer from './pages/Disclaimer';
import ReturnPolicy from './pages/ReturnPolicy';
import AdminDashboard from './admin/AdminDashboard';
import AddProduct from './admin/AddProduct';
import AdminProducts from './admin/AdminProducts';
import EditProduct from './admin/EditProduct';
import AdminOrders from './admin/AdminOrders';
import AdminUsers from './admin/AdminUsers';
import { AuthContext } from './context/AuthContext';

const RoleRoute = ({ allowedRoles, children }) => {
  const { user } = useContext(AuthContext);
  return user && allowedRoles.includes(user.role)
    ? children
    : <Navigate to={user ? '/' : '/login'} replace />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ordersuccess" element={<OrderSuccess />} />
          <Route path="/about" element={<About />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/return" element={<ReturnPolicy />} />
          <Route path="/admin" element={<RoleRoute allowedRoles={['admin', 'productManager']}><AdminDashboard /></RoleRoute>} />
          <Route path="/admin/add-product" element={<RoleRoute allowedRoles={['admin', 'productManager']}><AddProduct /></RoleRoute>} />
          <Route path="/admin/products" element={<RoleRoute allowedRoles={['admin', 'productManager']}><AdminProducts /></RoleRoute>} />
          <Route path="/admin/edit-product/:id" element={<RoleRoute allowedRoles={['admin', 'productManager']}><EditProduct /></RoleRoute>} />
          <Route path="/admin/orders" element={<RoleRoute allowedRoles={['admin']}><AdminOrders /></RoleRoute>} />
          <Route path="/admin/users" element={<RoleRoute allowedRoles={['admin']}><AdminUsers /></RoleRoute>} />
        </Routes>
      </div>
      <Footer />
      <Chatbot />
    </Router>
  );
}

export default App;
