import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserdetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import { useParams } from "react-router-dom";

function UserEditScreen() {
  const userId = useParams();
  const { id } = userId;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = userUpdate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: user._id, name, email, isAdmin }));
  };
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigateTo("/admin/userlist");
    } else {
      if (!user.name || user._id !== Number(id)) {
        dispatch(getUserdetails(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, user, id, successUpdate, navigateTo]);

  return (
    <>
      <div className="container">
        <Link className="btn btn-dark my-4 " to={`/admin/userlist`}>
          Go Back
        </Link>
      </div>

      <FormContainer>
        <h1 className="py-4">Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
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
                Admin :
              </label>
              <input
                onChange={(e) => setIsAdmin(e.target.checked)}
                label="Is Admin"
                checked={isAdmin}
                className="form-check-input ms-2  "
                type="checkbox"
                id="exampleInputPassword1"
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

export default UserEditScreen;
