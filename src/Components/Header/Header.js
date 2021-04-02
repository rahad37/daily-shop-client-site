import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
    return (
        <Container>
        <div className="d-flex justify-content-between design mt-3 mb-5 rounded">
            <h1>Daily Shop</h1>
            <ul>
                <li>
                <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="/login">Log In</Link>
                </li>
                <li>
                <Link to="/order">Orders</Link>
                </li>
                <li>
                <Link to="/addProducts">Admin</Link>
                </li>
                <li>
                <a href='/home' style={{color: 'white', background: 'black', padding: '5px', borderRadius: '5px'}}>Sign Out</a>
                </li>
            </ul>
        </div>
        </Container>
    );
};

export default Header;