import React from 'react'
import Rating from './Rating'
 import { Link } from 'react-router-dom'

function Product({product}) {
  const backendBaseUrl = 'http://localhost:8000';
   
  return (
    <div className="card my-3 p-3 rounded" >
        <Link to={`/product/${product._id}`}>
          
        <img className='w-100' src={`${backendBaseUrl}${product.image}`} alt={product.name} />
            
            <strong className=' '>{product.name}</strong>
        </Link>
        <Rating  value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
        <h3>${product.price}</h3>
    </div>
  )
}

export default Product