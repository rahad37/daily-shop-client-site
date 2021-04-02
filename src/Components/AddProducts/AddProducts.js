import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './AddProducts.css';
import AddIcon from '@material-ui/icons/Add';
import AppsIcon from '@material-ui/icons/Apps';
import BorderColorIcon from '@material-ui/icons/BorderColor';

const AddProducts = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const onSubmit = data => {
      const productData ={
        name: data.name,
        price: data.price,
        imageURL: imageURL
      }
      const url = `https://murmuring-fortress-97245.herokuapp.com/addProduct`

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
        <div className="sizing">
        <h5><AddIcon></AddIcon> Add Product</h5>
            <h5><AppsIcon></AppsIcon> Product Manage</h5>
            <h5><BorderColorIcon></BorderColorIcon> Product Edit</h5>
        </div>
        <form className='love' onSubmit={handleSubmit(onSubmit)}>
          <input name="name" placeholder='Product Name' ref={register} /><br></br><br></br>
          <input name="price" placeholder='Product Price' ref={register} /><br></br><br></br>
          <input name="exampleRequired" type='file' onChange={handleImageUpload} /><br></br><br></br>
          {errors.exampleRequired && <span>This field is required</span>}
          <input type="submit" />
        </form>

      </div>
    );  
};

export default AddProducts;