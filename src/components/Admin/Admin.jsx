import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, deletePostAsAdmin } from '../../features/posts/postsSlice';
import { Button } from '@chakra-ui/react';
import { FaRegTrashAlt } from "react-icons/fa";
import './Admin.scss';

const Admin = () => {
    const dispatch = useDispatch();
    const { posts, isLoading, error } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

    const handleDeletePost = (id) => {
        dispatch(deletePostAsAdmin(id));
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="admin">
            <h1>Admin Panel</h1>
            <div className="admin-posts">
                {posts.map((post) => (
                    <div key={post._id} className="admin-post">
                        <img
                            src={`http://localhost:8080/public/posts/${post.image}`}
                            alt="Post"
                            className="admin-post-image"
                        />
                        <p className="admin-post-text">{post.text}</p>
                        <Button
                            colorScheme="red"
                            onClick={() => handleDeletePost(post._id)}
                        >
                            <FaRegTrashAlt /> Delete
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Admin;
