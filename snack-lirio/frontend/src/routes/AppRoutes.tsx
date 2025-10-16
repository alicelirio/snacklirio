import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Cart from '../pages/Cart';
import ProductManagement from '../pages/ProductManagement';
import Products from '../pages/Products';
import Profile from '../pages/Profile';
import About from '../pages/About';
import Admin from '../pages/Admin';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/register" element={<Layout><Register /></Layout>} />
      <Route path="/products" element={<Layout><Products /></Layout>} />
      <Route path="/cart" element={<Layout><Cart /></Layout>} />
      <Route path="/meus-produtos" element={<Layout><ProductManagement /></Layout>} />
      <Route path="/profile" element={<Layout><Profile /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/admin" element={<Layout><Admin /></Layout>} />
    </Routes>
  );
}
