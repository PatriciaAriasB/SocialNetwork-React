import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../../features/posts/postsSlice";
import PropTypes from "prop-types";
import "./AddComment.scss";

const AddComment = ({ postId }) => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment({ postId, text: commentText }));
    setCommentText("");
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        type="text"
        value={commentText}
        onChange={handleChange}
        placeholder="Write a comment..."
        className="comment-input"
      />
      <button type="submit" className="comment-button">Comment</button>
    </form>
  );
};

AddComment.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default AddComment;
