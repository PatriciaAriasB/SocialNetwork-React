import axios from "axios";

const API_URL = "http://localhost:8080";

const getAllPosts = async () => {
  try {
    const res = await axios.get(`${API_URL}/posts`);
    return res.data;
  } catch (error) {
    console.error("Error fetching all posts:", error);
    throw error;
  }
};

const addComment = async (postId, comment) => {
  const token = localStorage.getItem('token') || null;
  const response = await axios.post(`${API_URL}/comments/id/${postId}`, { text: comment }, {
    headers: {
      Authorization: token
    }
  });
  return response.data;
};

const getById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/posts/id/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching post with id ${id}:`, error);
    throw error;
  }
};

const createPost = async (post) => {
  const token = localStorage.getItem('token') || null;
  try {
    const res = await axios.post(`${API_URL}/posts`, post, {
      headers: {
        Authorization: token
      }
    });
    return res.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

const deletePost = async (id) => {
  const token = localStorage.getItem('token') || null;
  try {
    const res = await axios.delete(`${API_URL}/posts/${id}`, {
      headers: {
        Authorization: token
      }
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

const deletePostAsAdmin = async (id) => {
  const token = localStorage.getItem('token') || null;
  try {
    const res = await axios.delete(`${API_URL}/posts/admin/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting post as admin:", error);
    throw error;
  }
};


const deleteComment = async (id) => {
  const token = localStorage.getItem('token') || null;
  try {
    const res = await axios.delete(`${API_URL}/comments/id/${id}`, {
      headers: {
        Authorization: token
      }
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

const updateComment = async (form) => {
  const token = localStorage.getItem('token') || null;
  const text = form.text;
  try {
    const res = await axios.put(`${API_URL}/comments/id/${form.id}`, { text }, {
      headers: {
        Authorization: token
      }
    });
    return res.data;
  } catch (error) {
    console.error(`Error updating comment with id : ${form.id}:`, error);
    throw error;
  }
};

const like = async (postId) => {
  const token = localStorage.getItem('token') || null;
  try {
    const res = await axios.put(`${API_URL}/posts/like/${postId}`, {}, {
      headers: {
        Authorization: token
      }
    });
    return res.data;
  } catch (error) {
    console.error(`Error liking post with id ${postId}:`, error);
    throw error;
  }
};

const dislike = async (postId) => {
  const token = localStorage.getItem('token') || null;
  try {
    const res = await axios.put(`${API_URL}/posts/dislike/${postId}`, {}, {
      headers: {
        Authorization: token
      }
    });
    return res.data;
  } catch (error) {
    console.error(`Error disliking post with id ${postId}:`, error);
    throw error;
  }
};

const postsService = {
  getAllPosts,
  getById,
  createPost,
  like,
  dislike,
  addComment,
  deletePost,
  deletePostAsAdmin,
  deleteComment,
  updateComment
};

export default postsService;
