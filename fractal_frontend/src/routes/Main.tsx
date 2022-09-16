import React from 'react'
import NavBar from '../components/NavBar'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom' 
export default function Main() {
  return (
    <div>
        <NavBar/>
        <Container className='mt-xxl-5'>
            <h1>Home Page</h1>
            <hr/>
            <ul>
                <li>Go to <Link to="/orders">Orders</Link></li>
                <li>Go to <Link to="/products">Products</Link></li>
            </ul>
         
        </Container>
    </div>
  )
}
