import { registerFailure, registerStart, registerSuccess } from "../userRedux";
// import { publicRequest } from "../../requestMethods";
import UserDataService from "../../services/user";

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    // const res = await publicRequest.post("/auth/register", user);
    let { status, response } = await UserDataService.createUser(user)
      .then(res => {
        return res.data
      })
      .catch((e) => {
        throw e;
      })
    // console.log(status, response, user)
    if (!status || !response || !response.insertedId) {
      throw new Error()
    }

    let result = await UserDataService.get(response.insertedId)
      .then(res => {
        return res.data
      })
      .catch((e) => {
        throw e;
      })

    dispatch(registerSuccess(result));
  } catch (err) {
    console.log(err);
    dispatch(registerFailure());
  }
};