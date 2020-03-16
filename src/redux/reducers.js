import callApi from "../utils/apiCaller";

const LOGIN_PENDING = "LOGIN_PENDING";
const LOGIN_SUCCESS = "LOGIN-SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";

function setLoginPending(isLoginPending) {
  return { type: LOGIN_PENDING, isLoginPending };
}

function setLoginSuccess(isLoginSuccess, data) {
  return { type: LOGIN_SUCCESS, isLoginSuccess, data: data };
}

function setLoginFailure(isLoginFailure) {
  return { type: LOGIN_FAILURE, isLoginFailure };
}

export function login(username, password) {
  return dispatch => {
    dispatch(setLoginPending(false));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginFailure(null));
    sendLoginRequest(username, password)
      .then(success => {
        dispatch(setLoginPending(false));
        dispatch(setLoginSuccess(true, success));
      })
      .catch(err => {
        dispatch(setLoginPending(false));
        dispatch(setLoginFailure(err));
      });
  };
}

export default function reducer(
  state = {
    isLoginPending: false,
    isLoginSuccess: false,
    isLoginFailure: null
  },
  action
) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isLoginSuccess: action.isLoginSuccess };

    case LOGIN_PENDING:
      return { ...state, isLoginPending: action.isLoginPending };
    case LOGIN_FAILURE:
      return { ...state, isLoginFailure: action.isLoginFailure };
    default:
      return state;
  }
}

function sendLoginRequest(username, password) {
  return new Promise((resolve, reject) => {
    let obj = { username: username, password: password };
    callApi("users/login", "post", obj).then(res => {
      //console.log(res.data.user == null);
      if (res.data.user == null) {
        return reject(new Error("Sai tên đăng nhập hoặc mật khẩu!"));
      } else {
        localStorage.setItem("user", res.data.jwt);
        return resolve(res.data);
      }
    });
  });
}
