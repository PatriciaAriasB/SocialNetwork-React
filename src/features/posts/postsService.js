import axios from "axios";

const API_URL = "http://localhost:8080";


const getAllPosts = async () => {
    const res = await axios.get(API_URL + "/posts");
    return res.data;
};

const getById = async (id) => {
    const res = await axios.get(API_URL + "/posts/id/" + id);
    return res.data;
};

const createPost = async (post) => {

    const token = localStorage.getItem('token') ||null

    const res = await axios.post(API_URL + "/posts", post, {
        headers : {
            Authorization : token
        }
    });
    return res.data;
};

const like = async (postId) => {
    
    const token = localStorage.getItem('token') ||null

    const res = await axios.put(API_URL + "/posts/like/" + postId,{}, {
        headers : {
            Authorization : token
        }
    });
    return res.data;
};

const dislike = async (postId) => {

    const token = localStorage.getItem('token') ||null

    const res = await axios.put(API_URL + "/posts/dislike/" + postId, {}, {
        headers : {
            Authorization : token
        }
    });
    return res.data;
};

const postsService = {
    getAllPosts,
    getById,
    createPost,
    like,
    dislike
};


export default postsService;