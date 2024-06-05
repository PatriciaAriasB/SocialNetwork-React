import axios from "axios";

const API_URL = "http://localhost:8080";

const token = localStorage.getItem('token') ||null

const getAllPosts = async () => {
    const res = await axios.get(API_URL + "/posts");
    return res.data;
};

const getById = async (id) => {
    const res = await axios.get(API_URL + "/posts/id/" + id);
    return res.data;
};

const createPost = async (post) => {
    const res = await axios.post(API_URL + "/posts", post, {
        headers : {
            Authorization : token
        }
    });
    return res.data;
};

const postsService = {
    getAllPosts,
    getById,
    createPost
};


export default postsService;