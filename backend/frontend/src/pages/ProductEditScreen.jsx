import React, { useEffect, useState } from "react";
import axios from "axios";
import FormContainer from "../components/FormContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProductDetails, updateProduct } from "../actions/ProductActions";
import { useParams } from "react-router-dom";
import { PRODUCT_UPDATE_RESET } from "../constants/ProductConstants";
function ProductEditScreen() {
  const productId = useParams();
  const { id } = productId;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    success: updateSuccess,
    error: updateError,
    loading: updateLoading,
  } = productUpdate;
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateProduct({
        id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };
  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigateTo("/admin/productlist");
    } else {
      if (!product.name || product._id !== Number(id)) {
        dispatch(listProductDetails(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, product, id, navigateTo, updateSuccess]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("product_id", id);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/products/upload/",
        formData,
        config
      );
      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="container">
        <Link className="btn btn-dark my-4 " to={`/admin/productlist`}>
          Go Back
        </Link>
      </div>

      <FormContainer>
        <h1 className="py-4">Edit Product</h1>
        {updateLoading && <Loader />}
        {updateError && <Message variant="danger">{updateError}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <form onSubmit={submitHandler}>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Products Name"
                value={name}
                type="text"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Price
              </label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                placeholder="Enter The price of the product "
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Image
              </label>
              <input
                onChange={(e) => setImage(e.target.value)}
                value={image}
                placeholder="Enter The price of the product "
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <input type="file" onChange={uploadFileHandler} />
              {uploading && <Loader />}
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Brand
              </label>
              <input
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
                placeholder="Enter The price of the product "
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Category
              </label>
              <input
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                placeholder="Enter The price of the product "
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Count In Stock
              </label>
              <input
                onChange={(e) => setCountInStock(e.target.value)}
                value={countInStock}
                placeholder="Enter The count of product "
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Description
              </label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Enter produuct description "
                type="textarea"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                style={{ height: 150 }}
              />
            </div>

            <button type="submit" class="btn btn-primary">
              Update
            </button>
          </form>
        )}
      </FormContainer>
    </>
  );
}

export default ProductEditScreen;
