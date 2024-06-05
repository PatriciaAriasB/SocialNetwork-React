import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostById } from "../../../features/postsSlice";

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch()
  const {post} = useSelector((state) => state.posts)

  useEffect(()=>{
    dispatch(getPostById(id))
  },[])

  return (
  <div>
    <h1>PostDetail</h1>
    <p>id : {post._id}</p>
    <p>name : {post.name}</p>
  </div>
  )
};

export default PostDetail;