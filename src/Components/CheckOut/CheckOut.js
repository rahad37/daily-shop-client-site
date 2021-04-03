import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './CheckOut.css';

const CheckOut = () => {
  const {_id} = useParams();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [orders, setOrders] = useState([])
  useEffect(()=>{
    fetch('https://murmuring-fortress-97245.herokuapp.com/products')
    .then(res => res.json())
    .then(data => setOrders(data))
  },[])
  const item = orders.find(item => item?._id === _id)

 
    return (
        <div className='beauty'>
        <h1>CheckOut</h1>
        <div className='ok'>
            <div className='d-flex justify-content-between rounded nice'>
              <h2>Product Name</h2>
              <h2>Quantity</h2>
              <h2>Price</h2>
          </div>
          <div className='d-flex justify-content-between rounded lovely mt-3'>
              <h5 className='pl-2'>{item?.name}</h5>
              <h5 className='pl-5'>1</h5>
              <h5 className='pr-4'>${item?.price}</h5>
          </div>
        </div>
            <button className='bg-danger' >CheckOut</button>       
    </div>
    );
};

export default CheckOut;