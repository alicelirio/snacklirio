import { Routes, Route } from 'react-router-dom'
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
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/orders" element={<Orders />} />
      <Route path="/profile/orders/:orderId" element={<OrderDetails />} />
      <Route path="/products" element={<Products />} />
      <Route
        path="/products/manage"
        element={
          <PrivateRoute allowedRoles={['fornecedor', 'admin']}>
            <ProductManagement />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={['admin', 'fornecedor']}>
            <AdminPage />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}
