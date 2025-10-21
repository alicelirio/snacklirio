import { Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Cart from '../pages/Cart'
import About from '../pages/About'
import Profile from '../pages/Profile'
import Products from '../pages/Products'
import ProductManagement from '../pages/ProductManagement'
import Orders from '../pages/Orders'
import OrderDetails from '../pages/OrderDetails'
import { AdminPage } from '../pages/Admin'
import { PrivateRoute } from '../components/PrivateRoute'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/register" element={<Layout><Register /></Layout>} />
      <Route path="/cart" element={<Layout><Cart /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/profile" element={<Layout><Profile /></Layout>} />
      <Route path="/profile/orders" element={<Layout><Orders /></Layout>} />
      <Route path="/profile/orders/:orderId" element={<Layout><OrderDetails /></Layout>} />
      <Route path="/products" element={<Layout><Products /></Layout>} />
      <Route
        path="/products/manage"
        element={
          <Layout>
            <PrivateRoute allowedRoles={['fornecedor', 'admin']}>
              <ProductManagement />
            </PrivateRoute>
          </Layout>
        }
      />
      <Route
        path="/meus-produtos"
        element={
          <Layout>
            <PrivateRoute allowedRoles={['fornecedor', 'admin']}>
              <ProductManagement />
            </PrivateRoute>
          </Layout>
        }
      />
      <Route
        path="/admin"
        element={
          <Layout>
            <PrivateRoute allowedRoles={['admin', 'fornecedor']}>
              <AdminPage />
            </PrivateRoute>
          </Layout>
        }
      />
    </Routes>
  )
}
