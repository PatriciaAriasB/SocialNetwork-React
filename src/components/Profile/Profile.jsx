import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../features/posts/postsSlice";
import { loged } from '../../features/auth/authSlice';
import './Profile.scss';

const Profile = () => {

    const  {user}  = useSelector((state) => state.auth) || null

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loged());
    }, [dispatch]);

    const initialValue = {
        text: "",
        image: "",
    }

    const [formPost, setFormPost] = useState(initialValue);
    const { text } = formPost;

    const handleChange = (e) => {
        e.preventDefault();
        setFormPost({
            ...formPost,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost(formPost));
    };

    if (!user) {
        return <p>Loading ...</p>;
    }

    return (
        <>
            <div className="profile">
                <div className="profile-header">
                    <img src={user.profilePicture || "https://via.placeholder.com/150"} alt="Profile" className="profile-picture" />
                    <div className="profile-info">
                        <h1 className="profile-name">{user.name}</h1>
                        <p className="profile-email">{user.email}</p>
                        <div className="profile-stats">
                            <span className="profile-stat">
                                <strong>{user.postsId.length}</strong> posts
                            </span>
                            <span className="profile-stat">
                                <strong>{user.followers.length}</strong> followers
                            </span>
                            <span className="profile-stat">
                                <strong>{user.following.length}</strong> following
                            </span>
                        </div>
                    </div>
                </div>
                <div className="profile-posts">
                    {user.postsId.map((post) => (
                        <div key={post._id} className="profile-post">
                            <img src={post.imageUrl || "https://via.placeholder.com/150"} alt="Post" className="post-image" />
                            <p className="post-text">{post.text}</p>
                        </div>
                    ))}
                </div>
            </div>
            <form onSubmit={handleSubmit} className="post-form">
                <input 
                    type="text" 
                    name="text" 
                    value={text} 
                    onChange={handleChange} 
                    placeholder="Write a caption..." 
                    className="post-input"
                />
                <button type="submit" className="post-button">Submit</button>
            </form>
        </>
    );
};

export default Profile;
