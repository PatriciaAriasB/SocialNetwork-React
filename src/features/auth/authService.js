import axios from "axios";

const API_URL = "http://localhost:8080";

const register = async (userData) => {
  
  const res = await axios.post(API_URL + "/users", userData);
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(API_URL + '/users/login', userData)
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", res.data.token);
  }
  return res.data
}
const loged = async () => {
  const token = localStorage.getItem('token') ||null

  const res = await axios.get(API_URL + "/users/loged", {
    headers: {
      Authorization: token
    }
  });
  return res.data;
};

const logout = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(API_URL + "/users/logout",{},  {
    headers: {
      authorization: token,
    },
  });
  if (res.data) {
    localStorage.clear();
  }
  return res.data;
};

const getUserByName = async (name) => {
  const res = await axios.get(API_URL + "/users/name/" + name);
  return res.data;
};

const profilePicture = async (img) => {
  const token = localStorage.getItem("token");

  const res = await axios.put(API_URL + "/users/profilePic", img, {
    headers: {
      authorization: token,
    },
  })
  console.log(res.data);
  return res.data
}

const authService = {
  register,
  login,
  loged,
  logout,
  getUserByName,
  profilePicture
};

export default authService;
