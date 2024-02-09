import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listUsers, deleteUser, logout } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function UserListScreen() {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.usersList);
  const { loading, error, users } = usersList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;
  const navigateto = useNavigate();

  

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigateto("/login");
    }
  
  
   
    
  }, [dispatch, navigateto, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?'))
    dispatch(deleteUser(id));
 

  
  };
  return (
    <>
      <div className="container">
        <h1 className="my-4">Users</h1>
        {loading ? (
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
                  <th>EMAIL</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.isAdmin ? (
                        <>
                          <b style={{ color: "green" }}>Admin</b>
                        </>
                      ) : (
                        <>
                          <b style={{ color: "blue" }}>Customer</b>
                        </>
                      )}
                    </td>
                    <td>
                      <Link to={`/admin/user/${user._id}/edit`}>
                        <div className="btn btn-primary">Edit</div>
                      </Link>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => deleteHandler(user._id)}
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

export default UserListScreen;
