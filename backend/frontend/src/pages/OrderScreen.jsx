import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { getOrderDetails } from "../actions/OrderActions";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import { listMyOrders } from "../actions/OrderActions";

function OrderScreen() {
  const { orderId } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;
  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }
  // const addPayPalScript=()=>{
  //   const script=document.createElement('script')
  //   script.type="text/javascript"
  //   script.src="https://www.paypal.com/sdk/js?client-id=AZgIZ2lsjCweWKC9Q5H2TWhMfC6EozaL4pCKXXyHIx4vZn0KboyBL0o8tiaRCuI1RwbIMoy24ktYUJyW&components=buttons"
  //   script.async=true
  //   script.onload=()=>{
  //     setSdkReady(true)
  //   }
  //   document.body.appendChild(script)
  // }

  const navigateTo = useNavigate();
  const backendBaseUrl = "http://localhost:8000";
  const dispatch = useDispatch();
  // const [sdkReady,setSdkReady]=useState(false),

  // AZgIZ2lsjCweWKC9Q5H2TWhMfC6EozaL4pCKXXyHIx4vZn0KboyBL0o8tiaRCuI1RwbIMoy24ktYUJyW
 
  useEffect(() => {
    if (!order || order._id !== Number(orderId)) {
      dispatch(getOrderDetails(orderId));
    } 
    dispatch(listMyOrders());
  }, [dispatch,order, orderId]);

  return loading ? (
    <Loader/>
  ):error ?(
    <Message variant='danger'>{error}</Message>
  ):(
    <>
    <div className="container">
      <h1>Order:{orderId}</h1>

      <div className="row">
        <div className="col-md-8">
          <ul class="list-group">
            <div class="list-group-item">
              <h2>Shipping</h2>
              <p>
                <strong>Shipping:</strong> {order.shippingAddress.address},
                {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>
            </div>
            <div class="list-group-item">
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong> {order.paymentMethod}
              </p>
            </div>
            <div class="list-group-item">
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info"> Your Cart is Empty </Message>
              ) : (
                <>
                  <div className="list-group">
                    {order.orderItems.map((item, index) => (
                      <>
                        <div className="list-grop-item" key={index}>
                          <div className="row">
                            <div className="col-md-2">
                              <img
                                className="w-100  rounded"
                                src={`${backendBaseUrl}${item.image}`}
                                alt={item.name}
                              />
                            </div>
                            <div className="col-md-5">
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </div>
                            <div className="col-md-4">
                              {item.qty} X ${item.price} = $
                              {(item.qty * item.price).toFixed(2)}{" "}
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div class="list-group-item"></div>
          </ul>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="list-group">
              <div className="list-group-item">
                <h2>Order Summary</h2>
              </div>
              <div className="list-group-item">
                <div className="row">
                  <div className="col-md-6">Items:</div>
                  <div className="col-md-6">${order.itemsPrice}</div>
                </div>
              </div>
              <div className="list-group-item">
                <div className="row">
                  <div className="col-md-6">Shipping:</div>
                  <div className="col-md-6">${order.shippingPrice}</div>
                </div>
              </div>
              <div className="list-group-item">
                <div className="row">
                  <div className="col-md-6">Tax:</div>
                  <div className="col-md-6">${order.taxPrice}</div>
                </div>
              </div>
              <div className="list-group-item">
                <div className="row">
                  <div className="col-md-6">Total:</div>
                  <div className="col-md-6">${order.totalPrice}</div>
                </div>
              </div>
              <div className="list-group-item">
                {error && <Message variant="danger">{error}</Message>}
              </div>
              <div className="list-group-item">
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
 
  


export default OrderScreen;
