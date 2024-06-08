import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../features/posts/postsSlice";
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

const Profile = () => {
    const { user } = useSelector((state) => state.auth) || null;
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    useEffect(() => {
        dispatch(loged());
    }, [user, dispatch]);

    const initialFormState = {
        text: "",
        image: null,
    };

    const [formPost, setFormPost] = useState(initialFormState);
    const { text, image } = formPost;

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('text', text);
        if (image) {
            formData.append('image', image);
        }
        dispatch(createPost(formData));
        setFormPost(initialFormState);
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
        dispatch(profilePicture(formData))
        onClose()
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
                </div>
                <div className="profile-posts">
                    {user.postsId.map((post) => (
                        <div key={post._id} className="profile-post">
                            <img
                                src={"http://localhost:8080/public/posts/" + post.image || "https://via.placeholder.com/150"}
                                alt="Post"
                                className="post-image"
                            />
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
                <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    className="post-input"
                />
                <button type="submit" className="post-button">Submit</button>
            </form>
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Select your image</DrawerHeader>
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
