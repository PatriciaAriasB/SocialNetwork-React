import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addComment, deleteComment, getPostById, updateComment } from "../../../features/posts/postsSlice";
import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";
import { Button, Modal } from 'react-bootstrap';
import "./PostDetail.scss";

const PostDetail = () => {
  const [comment, setComment] = useState('');
  const { id } = useParams();
  const dispatch = useDispatch();
  const { postById } = useSelector((state) => state.posts);
  const [editText, setEditText] = useState('');
  const [showEditComment, setShowEditComment] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  useEffect(() => {
    dispatch(getPostById(id));
  }, [id, dispatch]);

  const handleShowEditComment = (comment) => {
    setSelectedComment(comment);
    setEditText(comment.text);
    setShowEditComment(true);
  };

  const handleCloseEditComment = () => {
    setShowEditComment(false);
    setSelectedComment(null);
  };

  const handleSubmitEditComment = async (e, id) => {
    e.preventDefault();
    const dataEditComment = {
      id: id,
      text: editText
    };
    await dispatch(updateComment(dataEditComment));
    handleCloseEditComment();
    dispatch(getPostById(postById._id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataComment = {
      id: postById._id,
      text: comment
    };
    if (dataComment.text !== "") {
      await dispatch(addComment(dataComment));
      setComment("");
      dispatch(getPostById(id));
    }
  };

  const delComment = async (commentId) => {
    await dispatch(deleteComment(commentId));
    dispatch(getPostById(id));
  };

  return (
    <div className="post-detail">
      <div className="image-container">
        <img
          src={`http://localhost:8080/public/posts/${postById.image}`}
          alt="post"
          className="post-image"
        />
        <div className="footer">
          <p className="post-text">{postById.text}</p>
        </div>
      </div>
      <div className="post-info">
        {postById.commentsId?.map((comment) => (
          <React.Fragment key={comment._id}>
            <div className="notification">
              <div className="notiglow"></div>
              <div className="notiborderglow"></div>
              <div className="notititle">{comment.userId.name}</div>
              <div className="notibody">{comment.text}</div>
              <div className="notifooter">
                <span onClick={() => handleShowEditComment(comment)}><FaPencilAlt /></span>
                <span onClick={() => delComment(comment._id)}><FaRegTrashAlt /></span>
              </div>
            </div>
          </React.Fragment>
        ))}
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

      {selectedComment && (
        <Modal show={showEditComment} onHide={handleCloseEditComment}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={(e) => handleSubmitEditComment(e, selectedComment._id)} className="post-form">
              <input
                type="text"
                name="editText"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder="Edit comment here..."
                className="post-input"
              />
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default PostDetail;