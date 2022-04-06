import React from 'react';
// =========== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { cancelDelete } from "../Features/deleteSlice";
import { endReply } from "../Features/replySlice";
import { changeCommentObject } from "../Features/commentSlice";


function PopUp() {
  // ================== Redux dispatch & state.
  const dispatch = useDispatch();
  const activePopUp = useSelector(state => state.delete.isPopUpOpened);
  const commentsData = useSelector(state => state.comments.commentsData.comments);
  // ===== Edit state.
  const replyId = useSelector(state => state.reply.replyId);
  // ===== Item to delete state.
  const isElementNested = useSelector(state => state.delete.isCommentNested);
  const elementId = useSelector(state => state.delete.parrentId);
  const childId = useSelector(state => state.delete.childId);


  
  // ==================================== Confirm & Delete post. ====================================
  const confirmAndDelete = () => {
    if (isElementNested) {
      // ======================== Nested post.
      let duplicateData = commentsData.slice(0);
      let mainComment = duplicateData.filter(el => el.id === elementId)[0];

      const updatedElement = {
        "id": mainComment.id,
        "content": mainComment.content,
        "createdAt": mainComment.createdAt,
        "score": mainComment.score,
        "user": {
            "image": mainComment.user.image,
            "username": mainComment.user.username
        },
        "replies": duplicateData.filter(el => el.id === elementId)[0].replies.filter(rep => rep.id !== childId),
        "peopleWhoLiked": mainComment.peopleWhoLiked,
        "peopleWhoDisliked": mainComment.peopleWhoDisliked
      }
    
      duplicateData.splice(duplicateData.indexOf(mainComment), 1, updatedElement);
      dispatch(changeCommentObject({data: {comments: duplicateData}}));
      dispatch(cancelDelete())

    } else {
      // ======================== Surface post.
      dispatch(changeCommentObject({data: {comments: commentsData.filter(el => el.id !== elementId)}}));
      dispatch(cancelDelete())
    }
  }



  // ==================================== Close reply box (if there is text in it). ====================================
  const closePopUp = () => {
    dispatch(endReply());
    dispatch(cancelDelete());
  };



  return (
    <div className={activePopUp ? "pop-wrapper" : "hide-pop-wrapper"}>
      <div className="pop-container">
        <h1>{replyId !== null  ? "Cancel reply" : "Delete comment"}</h1>
        <p>{replyId !== null  ? "Are you sure you want to cancel this reply? All progress will be lost." : "Are you sure you want to delete this comment? This will remove the comment and can't be undone."}</p>
        <div className="buttons-container">
          <button className="no-btn" onClick={() => dispatch(cancelDelete())}>no, cancel</button>
          <button className="yes-btn" onClick={() => replyId ? closePopUp() : confirmAndDelete()}>yes, delete</button>
        </div>
      </div>
    </div>
  )
}

export default PopUp;