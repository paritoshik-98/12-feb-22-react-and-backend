import axios from "axios";
import "../../Axios";

export const signup = (name, email, password) => (dispatch) => {
  try {
    const input = { name: name, email: email, password: password };
    dispatch({ type: "REGISTER_REQUEST" });
    axios
      .post("/api/user/signup", input)
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: "REGISTER_SUCCESS" });
        }
      })
      .catch((err) =>
        dispatch({ type: "REGISTER_FAIL", payload: err.response.data })
      );
  } catch (error) {
    dispatch({ type: "REGISTER_FAIL", payload: error.message });
  }
};

export const login = (input) => (dispatch) => {
  try {
    // const input = { email: email, password: password };
    dispatch({ type: "LOGIN_REQUEST" });
    axios
      .post("/api/user/login", input)
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("accessToken", res.data.at);
        }
      })
      .catch((err) => dispatch({ type: "LOGIN_FAIL", payload: err.response.data }));
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", payload: error.message });
  }
};

// google login
export const LoginWithGoogle = (tokenId) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });
    axios
      .post("api/user/Googlelogin", {tokenId:tokenId})
      .then((res) => {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("accessToken", res.data.at);
      })
      .catch((err) =>
        dispatch({ type: "LOGIN_FAIL", payload: err.response.data })
      );
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", payload: error.message });
  }
};

// logout

export const Logout = () => async (dispatch) => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  axios.get('/api/user/logout').then(res=>{if(res.status===200){dispatch({ type: "USER_LOGOUT" })}})
  .catch(e=>console.log(e))
};

////////////// data  pic url --- {url}
export const updatePic = (data) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_REQUEST" });
    axios
      .post("api/user/updatePic", data)
      .then((res) => {if(res.status===200){
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        localStorage.setItem("user", JSON.stringify(res.data));
      }})
      .catch((err) =>
        dispatch({ type: "UPDATE_FAIL", payload: err.response.data })
      );
  } catch (error) {
    dispatch({ type: "UPDATE_FAIL", payload: error.message });
  }
};

////////////// data  new password --- {Pswd}
export const updatePassword = (data) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_REQUEST" });
    axios
      .post("api/user/updatePassword", data)
      .then((res) => {if(res.status===200){
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        localStorage.setItem("user", JSON.stringify(res.data));
      }})
      .catch((err) =>
        dispatch({ type: "UPDATE_FAIL", payload: err.response.data })
      );
  } catch (error) {
    dispatch({ type: "UPDATE_FAIL", payload: error.message });
  }
};
