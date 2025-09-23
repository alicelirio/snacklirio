import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import Layout from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
