import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addComment, getPostById } from "../../../features/posts/postsSlice";

import "./PostDetail.scss";

const PostDetail = () => {
  const [comment, setComment] = useState('');
  const { id } = useParams();
  const dispatch = useDispatch();
  const { postById } = useSelector((state) => state.posts);
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataComment = {
      id: postById._id,
      text: comment
    }
    dispatch(addComment(dataComment));
    setComment("");
  };
console.log(postById);
  useEffect(() => {
    dispatch(getPostById(id));
  }, [postById, dispatch, id]);

  return (
    <div className="post-detail">
      <img src={"http://localhost:8080/public/posts/" + postById.image} alt="post" className="post-image" />
      <div className="post-info">
        <p className="post-text">{postById.text}</p>
        <h2>Comments</h2>
        <div className="comments-section">
          {postById.commentsId?.map((comment) => (
            <div key={comment._id} className="comment">
              <p><strong>{comment.userId.name}:</strong> {comment.text}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="comment-form">
          <input
            type="text"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="comment-input"
          />
          <button type="submit" className="comment-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PostDetail;
