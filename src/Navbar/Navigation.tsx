import React from 'react'
import { Nav, Navbar } from 'react-bootstrap';

interface NavigationProps { }

export const Navigation: React.FC<NavigationProps> = ({ }) => {
    return (
        <Navbar bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="#home">Price Checker</Navbar.Brand>
            <Nav className="ml-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#settings">Settings</Nav.Link>
                <Nav.Link href="#login">Login</Nav.Link>
            </Nav>
        </Navbar>
    );
}