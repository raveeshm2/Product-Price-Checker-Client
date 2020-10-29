import React, { useState } from 'react'
import { Nav, Navbar } from 'react-bootstrap';
import { AddProductModal } from "../modal/AddProductModal"

interface NavigationProps { }

export const Navigation: React.FC<NavigationProps> = ({ }) => {
    const [addProduct, setAddProduct] = useState<boolean>(false);
    return (
        <>
            <Navbar bg="dark" variant="dark" fixed="top">
                <Navbar.Brand href="#home">Price Checker</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#" onClick={() => setAddProduct(true)}>Add Product</Nav.Link>
                    <Nav.Link href="#settings">Settings</Nav.Link>
                    <Nav.Link href="#login">Login</Nav.Link>
                </Nav>
            </Navbar>
            <AddProductModal show={addProduct} onHide={() => { setAddProduct(false) }} />
        </>
    );
}