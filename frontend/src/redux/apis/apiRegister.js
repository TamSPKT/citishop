import { registerFailure, registertart, registerSuccess } from "../userRedux";
import { publicRequest } from "../../requestMethods";

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure()); 
  }
};