import React from 'react';
// import Order from '../Order/Order';

const DataLoading = ({or}) => {
console.log('result')
    return (
        <div className='beauty'>
          <div className='d-flex justify-content-between'>
            <h2>Name: {or.name}</h2>
            <h2>Quantity: 1</h2>
            <h2>Price: {or.price}</h2>
          </div>
          
            <button className='bg-danger'>CheckOut</button>
        </div>
      );
    };

export default DataLoading;