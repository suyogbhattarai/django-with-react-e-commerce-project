import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {  deleteUser } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listProducts,deleteProduct } from "../actions/ProductActions";


function productListScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { Loading, error, products } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const { Loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDelete = useSelector((state) => state.userDelete);

  const navigateto = useNavigate();

  

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      navigateto("/login");
    }
  
  
   
    
  }, [dispatch, navigateto, userInfo, successDelete,successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')){

      dispatch(deleteProduct(id))
    }



  
  };
  const createProductHandler = () => {
    // if (window.confirm('Are you sure you want to delete this user?'))



  
  };
  return (
    <>
      <div className="container">
        <div className=" my-4 justify-content-between d-flex">
          <div className=" ">
              <h1>Products</h1>
          </div>
          <div className="">
            <div onClick={createProductHandler()} className="btn btn-primary">
              Create Product
            </div>
            
            </div>
        </div>
        {loadingDelete && <Loader/>}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
    
        {Loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <table width="100%">
              <thead>
                <tr>
                  {" "}
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                  
                    <td>
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <div className="btn btn-primary">Edit</div>
                      </Link>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i class="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
}

export default productListScreen;
