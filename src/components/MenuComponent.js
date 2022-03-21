import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import NavLink from 'react-bootstrap/NavLink';


const MenuComponent = () => {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <NavbarBrand href="#home">AVM Stores</NavbarBrand>
                <NavLink href='/items'>Items</NavLink>
                <NavLink href='/stocks'>Stocks</NavLink>
                <NavLink href='/stock-history'>Stock History</NavLink>
                <NavLink href='/customers'>Customers</NavLink>
                <NavLink href='/order-invoice'>Billing</NavLink>
                <NavLink href='/orders'>Billing History</NavLink>
            </Navbar>
        </>
    )
}

export default MenuComponent