import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Cart from '../pages/Cart';
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import SupplierDashboard from '../pages/dashboard/SupplierDashboard';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/register" element={<Layout><Register /></Layout>} />
      <Route path="/cart" element={<Layout><Cart /></Layout>} />
      <Route path="/dashboard/admin" element={<Layout><AdminDashboard /></Layout>} />
      <Route path="/dashboard/supplier" element={<Layout><SupplierDashboard /></Layout>} />
    </Routes>
  );
}
