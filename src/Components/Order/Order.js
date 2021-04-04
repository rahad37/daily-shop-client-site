import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';

import './Order.css';

const Order = () => {
  const [buys, setBuys] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:5001/allOrder')
    .then(res => res.json())
    .then(data => setBuys(data))
  },[])
  return (
    <div className='omg'>
      <h1 className='dd'>Order Details...</h1>
      <h3 style={{textAlign: 'center', fontStyle: 'italic', color: 'blue'}}>Total ordered Product: {buys.length}</h3>
      <ul>
          {
            buys.map(buy => <li buy={buy}><strong>Email:</strong> <span>{buy.email}</span> <strong className='side'>Product Name:</strong> <span>{buy.order.name}</span> <span className='pp'><EditIcon style={{color: 'green', cursor: 'pointer'}}></EditIcon> / <ClearIcon style={{color: 'red',cursor: 'pointer'}} ></ClearIcon></span></li>)
          }
      </ul>   
         
      
    </div>
  );
};

export default Order;