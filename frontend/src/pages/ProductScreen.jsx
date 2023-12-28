import React, { useState } from "react";
import "./productscreen.scss";
import Rating from "../components/Rating";
// import products from '../products'
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { listProductDetails } from "../actions/ProductActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProductScreen() {
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { error, loading, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigateTo(`/cart/${id}?qty=${qty}`);
  };
  const backendBaseUrl = "http://localhost:8000";
  return (
    <div className="container py-3 main">
      <Link to={`/`} className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger"> {error}</Message>
      ) : (
        <div className="row">
          <div className="col-lg-6  col-sm-12">
            <img
              key={product._id}
              className="w-100"
              src={`${backendBaseUrl}${product.image}`}
              alt=""
            />
          </div>
          <div className="col-lg-3">
            <div className="list-group">
              <div className="list-group-item">
                <h3 key={product._id}>{product.name}</h3>
              </div>
              <div className="list-group-item">
                <Rating
                  key={product._id}
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color="#f8e825"
                />
              </div>
              <div key={product._id} className="list-group-item">
                Price:${product.price}
              </div>
              <div key={product._id} className="list-group-item">
                Description:{product.description}
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="list-group">
              <div className="list-group-item">
                <div className="row">
                  <div className="col-lg-6">Price:</div>
                  <div key={product._id} className="col-lg-6">
                    <strong>${product.price}</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="list-group">
              <div className="list-group-item">
                <div className="row">
                  <div className="col-lg-6">status:</div>

                  <div className="col-lg-6">
                    <strong>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
            {product.countInStock > 0 && (
              <div className="list-group">
                <div className="list-group-item">
                  <div className="row">
                    <div className="col-lg-5">Qty:</div>

                    <div className="col-lg-7">
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="form-select"
                      >
                        {product.countInStock}
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="row">
              <div className="col-lg-12">
                {product.countInStock}
                <button
                  key={product._id}
                  disabled={product.countInStock <=  0}
                  className=" mt-3 btn btn-block btn-primary w-100 rounded-0"
                  type="button"
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
