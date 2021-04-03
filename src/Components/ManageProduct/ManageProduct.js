import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const ManageProduct = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [buys, setBuys] = useState([])
    useEffect(()=>{
        fetch('https://murmuring-fortress-97245.herokuapp.com/orderItem')
        .then(res => res.json())
        .then(data => setBuys(data))
    }, [])
    return (
        <div>
            <h1>This is the Product Management....</h1>
            {
                buys.map(buy => <h4>Email: {buy.email} Time: {buy.time}</h4>)
            }
        </div>
    );
};

export default ManageProduct;