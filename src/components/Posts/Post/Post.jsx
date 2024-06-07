import {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dislike, getAllPosts, like } from "../../../features/posts/postsSlice";
import "./Post.scss";

const Post = () => {
    const dispatch = useDispatch();

    const { posts, isLoading } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(getAllPosts());
    }, []);

    const putlike = (postId) => {
        dispatch(like(postId));
    };

    const putdislike = (postId) => {
        dispatch(dislike(postId));
    };

    if (isLoading) {
        return <h1>Cargando posts...</h1>;
    }

    return (
        <div className="container mt-5">
            <div className="row">
                {posts.map((post) => (
                    <div key={post._id} className="col-md-6">
                        <div className="card-client">
                            <div className="user-picture">
                                <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
                                </svg>
                            </div>
                            <p className="name-client">
                                <span>{post.userId?.name}</span>
                                <span>{post.text}</span>
                                <span>
                                    Likes : {post.likes.length}
                                </span>
                            </p>
                            <div className="social-media">
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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Post;