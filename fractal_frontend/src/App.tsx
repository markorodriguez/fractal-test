import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"

// Routes
import Main from './routes/Main'
import OrderDetails from './routes/OrderDetails'
import Orders from './routes/Orders'
import Products from './routes/Products'

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Main/>} />
            <Route path='/orders' element={<Orders/>} />
            <Route path='/order/:id' element={<OrderDetails/>} />
            <Route path='/products' element={<Products/>} />
        </Routes>
    </BrowserRouter>
  )
}
