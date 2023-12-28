import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {logout} from '../actions/userActions'



function Header() {
  const userLogin=useSelector(state => state.userLogin)
  const dispatch=useDispatch()
  const {userInfo}=userLogin  
  const logoutHandler  = ()=>{
    dispatch(logout())
  }
  return (
    <>
    <header className='bg-dark ' >
    <nav className="navbar navbar-expand-lg navbar-light px-3 container">
  <Link class="navbar-brand text-light" to={`/`}>ProShop</Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active ">
        <Link class="nav-link text-light d-flex align-items-center  gap-2" to={`/cart`}><i class="fa fa-shopping-cart" aria-hidden="true"></i>Cart</Link>
      </li>
      {userInfo ? (
        <div class="dropdown">
        <button id='username' class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          {userInfo.name}
        </button>
        <ul class="dropdown-menu">
          <li><Link class="dropdown-item" to="/profile">Profile</Link></li>
          <li onClick={ logoutHandler}><a class="dropdown-item" href="#">LogOut</a></li>
         
        </ul>
      </div>
      ):
      <li className="nav-item">
      <Link class="nav-link text-light d-flex align-items-center  gap-2 " to={`/login`}> <i class="fa fa-sign-in" aria-hidden="true"></i>Login</Link>
    </li>
      }
    
   
     
    </ul>
    {/* <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form> */}
  </div>
</nav>
        
    </header>
    </>
  )
}

export default Header