import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserByName } from "../../features/auth/authSlice";
import './Search.scss'

const Search = () => {
    const { name } = useParams();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserByName(name))
    }, [name]);

    const user = useSelector((state) => state.auth.findUser)
    
    if (!user) {
        return <p>cargando...</p>
    }
    return <>
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
    </>
};

export default Search;