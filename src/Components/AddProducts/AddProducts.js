import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import './AddProducts.css'

const AddProducts = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const onSubmit = data => {
      const productData ={
        name: data.name,
        price: data.price,
        imageURL: imageURL
      }
      const url = `http://localhost:5001/addProduct`

        fetch(url,{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(productData)
        })
        .then(res => console.log('server side response'))
    };


    
    const handleImageUpload = product =>{
      console.log(product.target.files[0])
      const imageData = new FormData();
      imageData.set('key', '582da06553cadb1eeeea452ae7ed102b');
      imageData.append('image', product.target.files[0]);

      axios.post('https://api.imgbb.com/1/upload', 
      imageData)
        .then(function (response) {
          setImageURL(response.data.data.display_url);
        })
        .catch(function (error) {
          console.log(error);
        });
  }
    return (
      <div className='d-flex justify-content-between art'>
        <div className="">
            <ul className="text-decoration-none">
                {/* <Link to='/addProduct'><li>Add Product</li></Link>
                <Link to='/manage'><li>Manage Product</li></Link>
                <Link to='/edit'><li>Edit Product</li></Link> */}
                <li>Add Product</li>
                <li>Manage Product</li>
                <li>Edit Product</li>
            </ul>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="name" defaultValue="New Product" ref={register} /><br></br>
          <input name="price" defaultValue="Product Price" ref={register} /><br></br>
          <input name="exampleRequired" type='file' onChange={handleImageUpload} /><br></br>
          {errors.exampleRequired && <span>This field is required</span>}
          <input type="submit" />
        </form>

      </div>
    );  
};

export default AddProducts;