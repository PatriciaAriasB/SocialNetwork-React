import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../features/posts/postsSlice";
import { getAllPosts } from "../../features/posts/postsSlice";
import { loged } from '../../features/auth/authSlice';

const Profile = () => {

    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(loged());
    }, []);


    const initialValue = {
        text: "",
        image: "",
    }
    const dispatch = useDispatch();

    const [formPost, setFormPost] = useState(initialValue);
    const { text } = formPost;

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
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">{user.role}</h6>
                    <p className="card-text">Followers: {user.followers.map((follower) => {
                        <span>{follower}</span>
                    })}</p>
                    <p className="card-text">Following: {user.following.map((follower) => {
                        <span>{follower}</span>
                    })}</p>
                    <p className="card-text">
                        Posts :
                        {user.postsId.map((post) => {
                            console.log(post);
                           return <span key={post._id}>{post.text}</span>
                        })}
                    </p>

                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="text" name="text" value={text} onChange={handleChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default Profile