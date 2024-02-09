import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {  register } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'





function RegisterScreen() {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[confirmPassword,setConfirmPassword]=useState('')
    const[message,setMessage]=useState('')
    const[name,setName]=useState('')
    const navigateTo =useNavigate()
    const location=useLocation()
    const dispatch=useDispatch()
    const userRegister=useSelector(state=> state.userRegister)
    const {error,loading,userInfo} = userRegister
    const redirect=location.search ? location.search.split('=')[1] :'/'

 
    const submitHandler =(e) =>{
        e.preventDefault()
        if(password != confirmPassword){
            setMessage('Passwords do not match')
        }
        else{
            dispatch(register(email,password,name))
        }
 
    }
    useEffect(()=>{
      if(userInfo){
        navigateTo(redirect)

      }
    },[navigateTo,redirect,userInfo])

   


  return (


    <FormContainer>
        <h1 className='py-4'>Sign in</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant="danger ">{error}</Message>}
        {loading && <Loader/>}
        <form onSubmit={submitHandler}>
        <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Name</label>
    <input onChange={(e)=> setName(e.target.value)} placeholder='Enter your Name' value={name} type="text" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
   <input required onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Enter Your Email' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input required onChange={(e)=> setPassword(e.target.value)} placeholder='Enter your Password' value={password} type="password" class="form-control" id="exampleInputPassword1"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
    <input required onChange={(e)=> setConfirmPassword(e.target.value)} placeholder='Confirm Password' value={confirmPassword} type="password" className="form-control" id="exampleInputPassword2"/>
  </div>
  <div class="mb-3 form-check">
    <input  type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button  type="submit" class="btn btn-primary">Register</button>

  <div className="row py-3">
    <div className="col-lg-6">
        Already have an account? <Link to={redirect ? `/login?redirect=${redirect}`:'/login'}>Sign In</Link>
    </div>
  </div>
</form>
    </FormContainer>
  )
}

export default RegisterScreen