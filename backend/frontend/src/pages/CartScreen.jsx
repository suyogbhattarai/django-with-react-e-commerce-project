import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { useParams,useNavigate,useLocation,Link } from 'react-router-dom'
import Message from '../components/Message'




function CartScreen() {
  const {id}=useParams()
  const location=useLocation()

  const {cartItems} =useSelector(state=> state.cart)



  const qty=location.search ? Number( location.search.split('=')[1]) : 1 
  const dispatch=useDispatch()
  const navigateTo=useNavigate()


  useEffect(()=>{
    if(id){

      dispatch(addToCart(id,qty))
    }
  },[dispatch,id,qty])

  const removeFromCartHandler=(id) =>{
    dispatch(removeFromCart(id))
  }

  const checkoutHandler =()=>{
    navigateTo(`/login?redirect=shipping`)
  }
  const backendBaseUrl = 'http://localhost:8000';
  return (
    <>
    <div className="container">
    <div className="row">
      <div className="col-lg-8">
        <h1>SHOPPING CART</h1>
       
          
        {cartItems.length === 0 ?(
          <Message variant='info' >Your Cart Is Empty <Link to='/'>Go Back</Link> </Message>
        )
        :(
          <>
           <div className="list-group">
          {cartItems.map((a)=>
          (
          <>
          <div className="list-group-item">
            <div className="row">
              <div className="col-md-2">
                <img className='w-100 rounded' src={`${backendBaseUrl}${a.image}`} alt="" />
              </div>
              <div className="col-md-3">
                <Link to={`/product/${a.product}`}>{a.name}</Link>
              </div>
              <div className="col-md-2">
                ${a.price}
              </div>
              <div className="col-md-3">
              <select
                        value={a.qty}
                        onChange={(e) => dispatch(addToCart(a.product,Number(e.target.value) ))}
                        className="form-select"
                      >
                        {[...Array(a.countInStock).keys()].map((x) => (
                          <option value={x+1} key={x + 1}>
                            {x + 1} 
                          </option>
                        ))}
                      </select>


              </div>
              <div className="col-md-1">
                <button onClick={()=>removeFromCartHandler(a.product)} type='button' className='btn btn-light'>
                <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
        
          </div>
          </div>
          
          </>
          ))}
          </div>
          </>
        )
      }


      </div>
      <div className="col-lg-4">
        <div className="card">
          <div className=" list-group ">
            <div className="list-group-item">
              <h2>Subtotal({cartItems.reduce((acc,item)=>acc + item.qty,0)})items</h2>
            ${cartItems.reduce((acc,item)=>acc + item.qty* item.price,0).toFixed(2)}
            </div>
            <div className="list-group-item">
              <button onClick={checkoutHandler} disabled={cartItems.length===0} type='button' className='btn btn-primary rounded-0 w-100'>Proceed To Checkout</button>
            </div>

          </div>
        </div>

      </div>
    </div>
    </div>
  
    </>
  )
}

export default CartScreen