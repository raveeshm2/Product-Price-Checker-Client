import React, { useState } from 'react'
import { Nav, Navbar } from 'react-bootstrap';
import { AddProductModal } from "../modal/AddProductModal";
import { CronJobModal } from "../cron/CronJobModal";
import { SettingsModal } from '../modal/SettingsModal';
import { LOGOUT_RESOURCE } from '../login/store/saga';
import { useDispatch } from 'react-redux';

interface NavigationProps { }

export const Navigation: React.FC<NavigationProps> = () => {
    const [addProduct, setAddProduct] = useState<boolean>(false);
    const [cronJob, setCronJob] = useState<boolean>(false);
    const [settings, setSettings] = useState<boolean>(false);
    const dispatch = useDispatch();

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
                        <Nav.Link href="#settings" onClick={() => setSettings(true)}>Settings</Nav.Link>
                        <Nav.Link href="#logout" onClick={() => dispatch(LOGOUT_RESOURCE.request(null))} >Log out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {addProduct && <AddProductModal show={addProduct} onHide={() => { setAddProduct(false) }} />}
            {cronJob && <CronJobModal show={cronJob} onHide={() => { setCronJob(false) }} />}
            {settings && <SettingsModal show={settings} onHide={() => { setSettings(false) }} />}
        </>
    );
}