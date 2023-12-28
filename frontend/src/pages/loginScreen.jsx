import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { login } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'





function loginScreen() {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const navigateTo =useNavigate()
    const location=useLocation()
    const dispatch=useDispatch()
    const userLogin=useSelector(state=> state.userLogin)
    const {error,loading,userInfo} = userLogin
    const redirect=location.search ? location.search.split('=')[1] :'/'

 
    const submitHandler =(e) =>{
        e.preventDefault()
        dispatch(login(email,password))
    }
    useEffect(()=>{
      if(userInfo){
        navigateTo(redirect)
      }
    },[navigateTo,redirect,userInfo])

   


  return (


    <FormContainer>
        <h1 className='py-4'>Sign in</h1>
        {error && <Message variant="danger ">{error}</Message>}
        {loading && <Loader/>}
        <form onSubmit={submitHandler}>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
   <input onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Enter Your Email' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input onChange={(e)=> setPassword(e.target.value)} placeholder='Enter your Password' value={password} type="password" class="form-control" id="exampleInputPassword1"/>
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button  type="submit" class="btn btn-primary">Sign In</button>

  <div className="row py-3">
    <div className="col-lg-6">
        New Customer? <Link to={redirect ? `/register?redirect=${redirect}`:'/register'}>Register</Link>
    </div>
  </div>
</form>
    </FormContainer>
  )
}

export default loginScreen