import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createPost, deletePost } from "../../features/posts/postsSlice";
import { loged, profilePicture } from '../../features/auth/authSlice';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
} from '@chakra-ui/react'
import './Profile.scss';
import { Modal } from 'react-bootstrap';
import { FaRegTrashAlt } from "react-icons/fa";

const Profile = () => {
    const { user } = useSelector((state) => state.auth) || null;
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    const initialFormState = {
        text: "",
        image: null,
    };

    const [formPost, setFormPost] = useState(initialFormState);
    const { text, image } = formPost;
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [showEditPost, setShowEditPost] = useState(false);
    const [showForDeletePost, setshowForDeletePost] = useState(false)

    const handleShowCreatePost = () => setShowCreatePost(true);
    const handleCloseCreatePost = () => setShowCreatePost(false);

    const handleShowEditPost = () => setShowEditPost(true);
    const handleCloseEditPost = () => setShowEditPost(false);

    useEffect(() => {
        dispatch(loged());
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormPost({
                ...formPost,
                image: files[0],
            });
        } else {
            setFormPost({
                ...formPost,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('text', text);
        if (image) {
            formData.append('image', image);
        }
        await dispatch(createPost(formData));
        setFormPost(initialFormState);
        dispatch(loged());
    };

    const [file, setFile] = useState(null);

    const handleFileChangeUser = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmitUser = async (e) => {
        e.preventDefault();
        if (!file) return;
        const formData = new FormData();
        formData.append('profilePic', file);
        await dispatch(profilePicture(formData))
        dispatch(loged());
        onClose()
    }

    const delPost = async (id) => {
        await dispatch(deletePost(id))
        dispatch(loged());
    }

    const setShowDeleteButtons = () => {
        if (!showForDeletePost) {
            setshowForDeletePost(true)
        } else {
            setshowForDeletePost(false)
        }
    }

    if (!user) {
        return <p>Loading ...</p>;
    }

    return (
        <>
            <div className="profile">
                <div className="profile-header">
                    <img
                        onClick={onOpen}
                        src={"http://localhost:8080/public/users/" + user.profilePic || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="profile-picture"
                    />
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
                    <p className='profileButtons'>
                        <button className="pushable createPost" onClick={handleShowCreatePost}>
                            <span className="shadow"></span>
                            <span className="edge"></span>
                            <span className="front">
                                Create post
                            </span>
                        </button>
                        <button className="pushable deletePost" onClick={setShowDeleteButtons}>
                            <span className="shadow"></span>
                            <span className="edge"></span>
                            <span className="front">
                                <FaRegTrashAlt />
                            </span>
                        </button>
                    </p>
                </div>

                <Modal show={showCreatePost} onHide={handleCloseCreatePost}>
                    <Modal.Header closeButton>
                        <Modal.Title>Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit} className="post-form">
                            <input
                                type="text"
                                name="text"
                                value={text}
                                onChange={handleChange}
                                placeholder="Post here..."
                                className="post-input"
                            />
                            <input
                                type="file"
                                name="image"
                                onChange={handleChange}
                                className="post-input"
                            />
                            <Button variant="primary" type='submit' onClick={handleCloseCreatePost}>
                                Save Changes
                            </Button>
                        </form>
                    </Modal.Body>
                </Modal>
                <div className="profile-posts">
                    {user.postsId.map((post) => (
                        <div key={post._id} className="profile-post image-container">
                            <img
                                onClick={() => handleShowEditPost(post)}
                                src={"http://localhost:8080/public/posts/" + post.image || "https://via.placeholder.com/150"}
                                alt="Post"
                                className="post-image"
                            />
                            {
                                showForDeletePost && (
                                    <button className="delete-button" onClick={() => delPost(post._id)}>
                                        &times;
                                    </button>
                                )
                            }
                            <p className="post-text">{post.text}</p>
                        </div>
                    ))}
                </div>
                <Modal show={showEditPost} onHide={handleCloseEditPost}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <>
                            <form onSubmit={handleSubmit} className="post-form">
                                <input
                                    type="text"
                                    name="text"
                                    value={text}
                                    onChange={handleChange}
                                    placeholder="Edit post here..."
                                    className="post-input"
                                />
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleChange}
                                    className="post-input"
                                />
                                <Button variant="primary" type='submit' onClick={handleCloseEditPost}>
                                    Save Changes
                                </Button>
                            </form>
                        </>
                    </Modal.Body>
                </Modal>
            </div >
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Select your profile image</DrawerHeader>
                    <DrawerBody>
                        <input
                            type="file"
                            name='image'
                            onChange={handleFileChangeUser}
                        />
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue" onClick={handleSubmitUser}>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};
export default Profile
