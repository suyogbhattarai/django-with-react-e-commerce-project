import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const navigateto = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
  if (!shippingAddress.address) {
    navigateto("/login/shipping");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod))
    navigateto("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <form onSubmit={submitHandler}>
        <h1>Select method</h1>
        <div className="d-flex gap-4 my-5">
        <div class="form-check">
          <input
            className="form-check-input "
            type="radio"
            name="flexRadioDefault"
            id="esewa"
            value="E-Sewa"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />

          <label class="form-check-label" for="flexRadioDefault1">
            E-sewa
          </label>
        </div>
        <div class="form-check">
          <input
            className="form-check-input "
            type="radio"
            name="flexRadioDefault"
            id="cashondelivery"
            value="Cash On Delivery"
            defaultChecked
            onChange={(e) => setPaymentMethod(e.target.value)}
          />

          <label class="form-check-label" for="flexRadioDefault2">
            Cash On Delivery
          </label>
        </div>
        </div>
        {console.log(paymentMethod)}

       

        <button type="submit" class="btn btn-primary">
          Continue
        </button>
      </form>
    </FormContainer>
  );
}

export default PaymentScreen;
