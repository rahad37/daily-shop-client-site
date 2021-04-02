import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css'

const Product = ({product}) => {
    
    return (
        <div className='style rounded'>
            <row>
                <div>
                    <img style={{height:'280px', width:'250px'}} src={product.imageURL} alt=''/>
                <div className='d-flex justify-content-between'>
                    <h4>{product.name}</h4>
                    <h4>Price: ${product.price}</h4>
                    
                </div>
                    <Link to={`/productId/${product._id}`}><button className='bg-primary p-1 rounded'>Buy Now</button></Link>
            
                </div>

            
            </row>
            
            
        </div>
    );
};

export default Product;