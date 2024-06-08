import {useEffect} from 'react'
import Post from './Post/Post'
import { useDispatch } from 'react-redux';
import { getAllPosts } from '../../features/posts/postsSlice';
const Posts = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPosts())
    }, []);

    return (
        <div>
            <Post />
        </div>
    )
}

export default Posts