import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { follow, getUserByName, unfollow } from "../../features/auth/authSlice";
import './Search.scss';
import NotFound from "../NotFound/NotFound";

const Search = () => {
    const { name } = useParams();
    const dispatch = useDispatch();

    const followUser = (userId) => {
        dispatch(follow(userId));
    };

    const unfollowUser = (userId) => {
        dispatch(unfollow(userId));
    };
    const userLogged = JSON.parse(localStorage.getItem('user'));
    const user = useSelector((state) => state.auth.findUser);

    useEffect(() => {
        dispatch(getUserByName(name));
    }, [dispatch, name]);

    if (!user) {
        return <NotFound />
    }

    return (
        <div className="profile">
            <div className="profile-header">
                <img src={"http://localhost:8080/public/users/" + (user.profilePic || "https://via.placeholder.com/150")} alt="Profile" className="profile-picture" />
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
                    {user._id !== userLogged._id && !user.followers.some(follw => follw === userLogged._id) && (
                        <p className="follow" onClick={() => followUser(user._id)}>Seguir</p>
                    )}
                    {user._id !== userLogged._id && (
                        <p className="follow" onClick={() => unfollowUser(user._id)}>Dejar de seguir</p>
                    )}
                </div>
            </div>
            <div className="profile-posts">
                {user.postsId.map((post) => (
                    <div key={post._id} className="profile-post">
                        <img src={"http://localhost:8080/public/posts/" + (post.image || "https://via.placeholder.com/150")} alt="Post" className="post-image" />
                        <p className="post-text">{post.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;