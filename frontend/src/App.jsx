import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.scss'
import HomeScreen from './pages/HomeScreen'
import {   Route, Routes} from 'react-router-dom'
import ProductScreen from './pages/ProductScreen'
import CartScreen from './pages/CartScreen'
import loginScreen from './pages/loginScreen'
import RegisterScreen from './pages/RegisterScreen'
import ShippingScreen from './pages/ShippingScreen'
import ProfileScreen from './pages/ProfileScreen'
import PaymentScreen from './pages/PaymentScreen'
import PlaceOrderScreen from './pages/PlaceOrderScreen'
import OrderScreen from './pages/OrderScreen'


function App() {
  return (
   <>
    <Header/>
    <Routes>
      <Route path='/' Component={HomeScreen} exact  />
      <Route path='/login' Component={loginScreen}  />
      <Route path='/register' Component={RegisterScreen}  />
      <Route path='/product/:id' Component={ProductScreen}/>
      <Route path='/cart/:id?' Component={CartScreen}/>
      <Route path='login/shipping' Component={ShippingScreen}/>
      <Route path="/payment" Component={PaymentScreen}/>
      <Route path="/placeorder" Component={PlaceOrderScreen}></Route>
      <Route path='/profile' Component={ProfileScreen}/>
      <Route path='/order/:orderId' Component={OrderScreen}> </Route>


    </Routes>
    <Footer/>
    </>
   
  
  )
}

export default App