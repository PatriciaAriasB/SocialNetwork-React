import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dislike, getAllPosts, like } from "../../../features/posts/postsSlice";
import { Link, useNavigate } from "react-router-dom";
import "./Post.scss";

const Post = () => {
    const dispatch = useDispatch();
    const { posts, isLoading } = useSelector((state) => state.posts);
    const navigate = useNavigate();
    const userLogged = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

    const putlike = (postId) => {
        dispatch(like(postId));
    };

    const putdislike = (postId) => {
        dispatch(dislike(postId));
    };

    if (isLoading) {
        return <div className="custom-loader"></div>;
    }
    
    const searchUser = (user) => {
        user._id === userLogged._id ? (
            navigate(`/profile`)
        ) : (
            navigate(`/search/${user.name}`)
        );
    };

    const postList = posts.map((post) => (
        <div key={post._id} className="col-md-6 mb-4">
            <div className="card-post">
                <div className="post-header">
                    <div className="user-picture" onClick={() => searchUser(post.userId)}>
                        <img src={"http://localhost:8080/public/users/" + post.userId?.profilePic} alt="user profile" />
                    </div>
                    <p className="name-client">
                        <span>{post.userId?.name}</span>
                    </p>
                </div>
                <div className="post-image-container">
                    <img src={"http://localhost:8080/public/posts/" + post.image} alt="post" className="post-image" />
                </div>
                <div className="post-body">
                    <p className="post-text">{post.text}</p>
                </div>
                <div className="post-footer">
                    <div className="social-media">
                        <span className="likes">{post.likes.length}</span>
                        <a onClick={() => putlike(post._id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path d="M1 21h4V9H1v12zM23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14 2 7.59 8.59C7.21 8.95 7 9.45 7 10v8c0 1.1.9 2 2 2h9c.78 0 1.48-.45 1.82-1.11l3.18-6.37c.11-.23.16-.47.16-.72v-1z" />
                            </svg>
                        </a>
                        <a onClick={() => putdislike(post._id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path d="M1 3h4v12H1V3zm22 10c0 1.1-.9 2-2 2h-6.31l.95 4.57.03.32c0 .41-.17.79-.44 1.06L14 22 7.59 15.41C7.21 15.05 7 14.55 7 14V6c0-1.1.9-2 2-2h9c.78 0 1.48.45 1.82 1.11l3.18 6.37c.11.23.16.47.16.72v1z" />
                            </svg>
                        </a>
                    </div>
                    <div className="comments">
                        <span className="commentsLenght">{post.commentsId.length}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M21 6h-2V4c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v2H3c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h6l4 4 4-4h4c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-2 12h-4.17L12 20.17 9.17 18H5V8h14v10z" />
                        </svg>
                        <Link to={"/post/" + post._id}>Comments</Link>
                    </div>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="container mt-5">
            <div className="row">
                {postList}
            </div>
        </div>
    );
};

export default Post;
