import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';


const Home = () => {
   const [products, setProducts] = useState([]);
   useEffect(()=>{
    fetch('https://calm-lowlands-46734.herokuapp.com/products')
    .then(res => res.json())
    .then(data => setProducts(data))
   
   }, [])
    return (
        <div className='row'>
            {
                products.length === 0 && <CircularProgress style={{ margin: '0 auto'}}/>
            }
            {
                products.map(product => <Product product={product}></Product>)
            }
        </div>
    );
};

export default Home;