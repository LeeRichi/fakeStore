import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userSlice from './store/userSlice'
import LogInPage from './pages/LogInPage'
import Home from './pages/Home'
import Cart from './pages/Cart'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Navbar from './components/Navbar'
import productSlice from './store/productSlice'
import cartSlice from './store/cartSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
    products: productSlice,
    cart: cartSlice,
  },
})

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App