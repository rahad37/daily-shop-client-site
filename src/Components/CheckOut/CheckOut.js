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
    fetch('http://localhost:5001/products')
    .then(res => res.json())
    .then(data => setOrders(data))
  },[])
  const item = orders.find(item => item?._id === _id)

  const handleOrder =()=>{
   const newOrder = {...loggedInUser};
   
  }
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
              <h3 className='pl-2'>{item?.name}</h3>
              <h3>1</h3>
              <h3 className='pr-4'>{item?.price}</h3>
          </div>
        </div>
        
        <Link to='/order'>
            <button className='bg-danger' onClick={handleOrder}>CheckOut</button>
        </Link>
    </div>
    );
};

export default CheckOut;