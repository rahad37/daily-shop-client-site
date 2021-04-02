import React, { useEffect, useState } from 'react';
import Order from '../Order/Order';
import Product from '../Product/Product';


const Home = () => {
   const [products, setProducts] = useState([]);
   useEffect(()=>{
    fetch('http://localhost:5001/products')
    .then(res => res.json())
    .then(data => setProducts(data))
   }, [])
    return (
        <div className='row'>
            {
                products.map(product => <Product product={product}></Product>)
            }
        </div>
    );
};

export default Home;