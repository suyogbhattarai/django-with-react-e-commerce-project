import React from 'react'
// import products from '../products'
import { useDispatch,useSelector } from 'react-redux'
import Product from '../components/Product'
import './homescreen.scss'

import { useEffect } from 'react'
import { listProducts } from '../actions/ProductActions'
import Loader from '../components/Loader'
import Message from '../components/Message'



function HomeScreen() {
  const dispatch=useDispatch()
  const {error,loading,products}=useSelector(state => state.productList)
  
  

  useEffect(() => {


    dispatch(listProducts())

  


    
  }, [dispatch])


  
  
  return (
    <div className='container py-3 main'>
        <h1>Latest product</h1>
         {loading ? <Loader/>
         :error ? <Message variant='danger'  >{error}</Message>
        
        : 
        <div  className="row">
            {products.map(product =>(
                <div key={product._id} className="col-lg-3 col-sm-12 col-md-6">
                    <Product product={product}/>
                    
                </div>
            ))}
        </div>
        }
        
    </div>
  )
}

export default HomeScreen