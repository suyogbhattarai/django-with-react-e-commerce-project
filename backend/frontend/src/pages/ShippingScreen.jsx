import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {  register } from '../actions/userActions'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'



function ShippingScreen() {
  const cart = useSelector(state=> state.cart)
  const {shippingAddress}=cart


  const dispatch=useDispatch();
  const navigateto=useNavigate();

  const[address,setAddress]=useState(shippingAddress.address)
  const[postalCode,setPostalCode]=useState(shippingAddress.postalCode)
  const[city,setCity]=useState(shippingAddress.city)
  const[country,setCountry]=useState(shippingAddress.country)
  const submitHandler=(e) =>{
    e.preventDefault()
    dispatch(saveShippingAddress({address,city,postalCode,country}))
    navigateto('/payment')
  
  }

  return (
    <FormContainer>
      <CheckoutSteps  step1 step2 />
      <h1>Shipping</h1>
      <form onSubmit={submitHandler}>
      <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Address</label>
    <input onChange={(e)=> setAddress(e.target.value)} placeholder='Enter your address' value={address ? address: ''} type="text" className="form-control" id="exampleInputPassword1"/>
  </div>
  
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">City</label>
    <input onChange={(e)=> setCity(e.target.value)} placeholder='Enter your city' value={city ? city: ''} type="text" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">postalCode</label>
    <input onChange={(e)=> setPostalCode(e.target.value)} placeholder='Enter your postal code' value={postalCode ? postalCode: ''} type="text" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Country</label>
    <input onChange={(e)=> setCountry(e.target.value)} placeholder='Enter your country' value={country ? country: ''} type="text" className="form-control" id="exampleInputPassword1"/>
  </div>
  <button  type="submit" class="btn btn-primary">Continue</button>

      </form>

    </FormContainer>
  )
}

export default ShippingScreen