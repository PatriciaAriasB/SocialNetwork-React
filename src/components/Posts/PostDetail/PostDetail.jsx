import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostById } from "../../../features/posts/postsSlice";
// import { addComment } from "../../../features/posts/postsSlice";

import "./PostDetail.scss";

// const [comment, setComment] = useState('');

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPostById(id));
  }, [dispatch, id]);

  return (
    <div className="post-detail">
      <img src={"http://localhost:8080/public/posts/" + post.image} alt="post" className="post-image" />
      <div className="post-info">
      <p className="post-text">{post.text}</p>
      <h2>Comments</h2>
{/* <div className="comments-section">
  {post.comments && post.comments.map((comment) => (
    <div key={comment._id} className="comment">
      <p><strong>{comment.user.name}:</strong> {comment.text}</p>
    </div>
  ))}
</div>
<form onSubmit={handleAddComment} className="comment-form">
  <input
    type="text"
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    placeholder="Add a comment..."
    className="comment-input"
  />
  <button type="submit" className="comment-button">Submit</button>
</form> */}
      </div>
    </div>
  );
};

export default PostDetail;
