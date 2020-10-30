import React, { useState } from 'react'
import { Nav, Navbar } from 'react-bootstrap';
import { AddProductModal } from "../modal/AddProductModal";
import { CronJobModal } from "../modal/CronJobModal";

interface NavigationProps { }

export const Navigation: React.FC<NavigationProps> = ({ }) => {
    const [addProduct, setAddProduct] = useState<boolean>(false);
    const [cronJob, setCronJob] = useState<boolean>(false);
    return (
        <>
            <Navbar bg="dark" variant="dark" fixed="top" expand="md">
                <Navbar.Brand href="#home">Price Checker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#addProduct" onClick={() => setAddProduct(true)}>Add Product</Nav.Link>
                        <Nav.Link href="#cronJobs" onClick={() => setCronJob(true)}>CRON Jobs</Nav.Link>
                        <Nav.Link href="#login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <AddProductModal show={addProduct} onHide={() => { setAddProduct(false) }} />
            <CronJobModal show={cronJob} onHide={() => { setCronJob(false) }} />
        </>
    );
}