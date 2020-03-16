import callApi from "../utils/apiCaller";

export const userPostFetch = user => {
  console.log(user);
  return dispatch => {
    return callApi("users/login", "post", user).then(data => {
      if (data.message) {
      } else {
        localStorage.setItem("token", data.jwt);
        dispatch(loginUser(data.user));
      }
    });
  };
};

const loginUser = userObj => ({
  type: "LOGIN_USER",
  payload: userObj
});
