import {
  loginFailure, loginStart, loginSuccess,
  getUserStart, getUserSuccess, getUserFailure,
  deleteUserStart, deleteUserSuccess, deleteUserFailure,
  updateUserStart, updateUserFailure, updateUserSuccess,
  addUserStart, addUserFailure, addUserSuccess
} from "../userRedux"
import { publicRequest, userRequest } from "../../requestMethods";


export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
//user
export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
   
    const res = await publicRequest.get("/users");
    dispatch(getUserSuccess(res.data));
   
  } catch (err) {
    dispatch(getUserFailure());
  }
};
export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    // const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    // update
    dispatch(updateUserSuccess({ id, user }));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};
export const addUser = async (user, dispatch) => {
  dispatch(addUserStart());
  try {
    const res = await userRequest.post(`/users`, user);
    dispatch(addUserSuccess(res.data));
  } catch (err) {
    dispatch(addUserFailure());
  }
};

