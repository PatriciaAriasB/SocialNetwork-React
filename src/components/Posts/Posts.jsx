import React, { useEffect, useState } from 'react'
import Post from './Post/Post'
import { useDispatch, useSelector } from "react-redux";
import { createPost, getAllPosts, reset } from "../../features/posts/postsSlice";
const Posts = () => {
    const { isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    const initialValue = {
        text: "",
        image: "",
    }

    const [formPost, setFormPost] = useState(initialValue);
    const { text } = formPost;

    useEffect(() => {
        dispatch(getAllPosts());
    }, []);

    if (isLoading) {
        return <h1>Cargando posts...</h1>;
    }
    const handleChange = (e) => {
        e.preventDefault()
        setFormPost({
            ...formPost,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost(formPost));
    };

    return (
        <div>
            <h1>Posts</h1>
            <Post />
            <form onSubmit={handleSubmit}>
                <label>
                    Input Text:
                    <input type="text" name="text" value={text} onChange={handleChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Posts