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
  const token = localStorage.getItem('token') || null

  const res = await axios.get(API_URL + "/users/loged", {
    headers: {
      Authorization: token
    }
  });
  return res.data;
};

const logout = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(API_URL + "/users/logout", {}, {
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

const getUserById = async (id) => {
  const res = await axios.get(API_URL + "/users/id/" + id);
  return res.data;
};

const profilePicture = async (img) => {
  const token = localStorage.getItem("token");

  const res = await axios.put(API_URL + "/users/profilePic", img, {
    headers: {
      authorization: token,
    },
  })
  return res.data
}

const follow = async (userId) => {
  const token = localStorage.getItem('token') || null;
  try {
    const res = await axios.put(`${API_URL}/users/follow/${userId}`, {}, {
      headers: {
        Authorization: token
      }
    });
    return res.data;
  } catch (error) {
    console.error(`Error following user ${userId}:`, error);
    throw error;
  }
};

const unfollow = async (userId) => {
  const token = localStorage.getItem('token') || null;
  try {
    const res = await axios.put(`${API_URL}/users/unfollow/${userId}`, {}, {
      headers: {
        Authorization: token
      }
    });
    return res.data;
  } catch (error) {
    console.error(`Error unfollowing user ${userId}:`, error);
    throw error;
  }
};

const authService = {
  register,
  login,
  loged,
  logout,
  getUserByName,
  profilePicture,
  follow,
  unfollow,
  getUserById
};

export default authService;
