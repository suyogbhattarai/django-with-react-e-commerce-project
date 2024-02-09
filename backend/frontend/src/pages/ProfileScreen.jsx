import React, { useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserdetails, updateUserProfile } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

import {
  USER_UPDATE_PROFILE_RESET,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
} from "../constants/userConstants";

import { listMyOrders } from "../actions/OrderActions";

function ProfileScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const navigateTo = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile; 

  const orderListMy = useSelector((state) => state.orderListMy);

  const { loading:loadingOrders,error:errorOrders,orders } = orderListMy; 

  useEffect(() => {
  
    if (!userInfo) {
      navigateTo("/login ");
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserdetails("profile"));
        dispatch(listMyOrders());
      } else {
        {
          setName(user.name);
          setEmail(user.email);
          
        }
      }
    }
  }, [navigateTo, user, dispatch, userInfo, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
      dispatch({ type: USER_DETAILS_SUCCESS });
      setMessage("Updated Successfully !");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3">
          <h2>User Profile</h2>

          {message && <Message variant="info">{message}</Message>}
          {error && <Message variant="danger ">{error}</Message>}
          {loading && <Loader />}
          <form onSubmit={submitHandler}>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your Name"
                value={name}
                type="text"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter Your Email"
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />

              <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password"
                type="password"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Confirm Password
              </label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                value={confirmPassword}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1">
                Check me out
              </label>
            </div>
            <button type="submit" class="btn btn-primary">
              Update
            </button>
          </form>
        </div>
        <div className="col-lg-9">
          <h2>My Orders</h2>
          {loadingOrders ? (<Loader/>):
          errorOrders ? (<Message variant='danger'>{errorOrders}</Message>):(
            <table width={`100%`} border={`1px` }>
              <thead>
              <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              
            </tr>
              </thead>
              <tbody>
                {orders.length == 0 ? 
                (<><td colSpan={5} style={{textAlign:"center"}}>
                  <h1>You have no orders placed</h1>
                  <br />
                  <div className="btn btn-primary"><Link style={{color:"white"}} to={`/`}>Shop Now</Link></div>
                   </td></>)
                :
                orders.map(order=> (
                  <>
                  <tr>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0,10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.isPaid ? (<><b>{order.paidAt.substring(0,10)}</b></>):(<>
                    <b>Not Paid</b>
                    </>)}</td>
                    <td>
                      <span  className="btn btn-primary"><Link style={{color:"white"}} to={`/order/${order._id}`}>Details </Link></span>
                      
                    </td>
                  </tr>
                  </>
                ))
                }
              </tbody>
           
          </table>
          )
          }
          
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
