import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom"
import { INavbar } from "../models/Navbar/INavbar";

export default function NavBar({activeElement}:INavbar) {

    const [orderActive, setOrderActive] = useState(false)
    const [productsActive, setProductsActive] = useState(false)

    useEffect(()=>{
        switch (activeElement) {
            case 'order':
                setOrderActive(true)
                break;
            case 'products':
                setProductsActive(true)
                break;
            default:
                break;
        }
    },[activeElement])

    return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Fractal Test</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <div className="d-flex align-items-center m-2">
                    <Link to="/orders" className={orderActive ? 'link-selected' : ''}>Order</Link>
            </div>
            <div className="d-flex align-items-center m-2">
                    <Link to="/products" className={productsActive ? 'link-selected' : ''}>Products</Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
