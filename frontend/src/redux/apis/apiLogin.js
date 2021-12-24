import { loginFailure, loginStart, loginSuccess } from "../userRedux";
// import { publicRequest } from "../../requestMethods";
import UserDataService from "../../services/user";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    // const res = await publicRequest.post("/auth/login", user);
    let result = await UserDataService.getByUsername(user.username)
      .then(res => {
        return res.data
      })
      .catch((e) => {
        throw e;
      })
    // console.log(result, user)
    if (!result || result.password !== user.password) {
      throw new Error()
    }

    dispatch(loginSuccess(result));
  } catch (err) {
    console.log(err)
    dispatch(loginFailure());
  }
};