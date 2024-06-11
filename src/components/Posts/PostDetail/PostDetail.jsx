import { useEffect, useState } from "react";
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
  const [editText, setEditText] = useState('')
  const [showEditComment, setShowEditComment] = useState(false);

  useEffect(() => {
    dispatch(getPostById(id));
  }, []);

  const handleShowEditComment = () => setShowEditComment(true);
  const handleCloseEditComment = () => setShowEditComment(false);

  const handleChangeEditComment = (e) => {
    e.preventDefault();
    setEditText(e.target.value)
  }

  const handleSubmitEditComment = (id) => {
    dispatch(updateComment(id, editText));
    setEditText("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataComment = {
      id: postById._id,
      text: comment
    }
    if (!dataComment.text == "") {
      await dispatch(addComment(dataComment));
      setComment("");
    }
    setComment("");
    dispatch(getPostById(id));
  };

  const delComment = async (commentId) => {
    await dispatch(deleteComment(commentId))
    dispatch(getPostById(id));
  }

  return (
    <div className="post-detail">
      <div className="image-container">
        <img src={"http://localhost:8080/public/posts/" + postById.image} alt="post" className="post-image" />
        <div className="footer">
          <p className="post-text">{postById.text}</p>
        </div>
      </div>
      <div className="post-info">
        {postById.commentsId?.map((comment) => (
          <>
            <div className="notification" key={comment._id}>
              <div className="notiglow"></div>
              <div className="notiborderglow"></div>
              <div className="notititle">{comment.userId.name}</div>
              <div className="notibody">{comment.text}</div>
              <div className="notifooter">
                <span onClick={() => delComment(comment._id)}><FaPencilAlt /></span>
                <span onClick={() => handleShowEditComment()}><FaRegTrashAlt /></span>
              </div>
            </div>
            <Modal show={showEditComment} onHide={handleCloseEditComment}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Post</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <>
                  <form onSubmit={()=>handleSubmitEditComment(comment._id)} className="post-form">
                    <input
                      type="text"
                      name="text"
                      value={editText}
                      onChange={handleChangeEditComment}
                      placeholder="Edit post here..."
                      className="post-input"
                    />
                    <Button variant="primary" type='submit' onClick={handleCloseEditComment}>
                      Save Changes
                    </Button>
                  </form>
                </>
              </Modal.Body>
            </Modal>
          </>
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
    </div>
  );
};

export default PostDetail;
