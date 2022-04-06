import React from 'react';
import { MdCancel } from "react-icons/md";
// =========== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { startReply } from "../Features/replySlice";
import { changeCommentObject } from "../Features/commentSlice";
import { startEdit, startNestedEdit, endEdit } from "../Features/editSlice";
import { openPopUp } from "../Features/deleteSlice";



function Action(props) {
  // ================== Redux dispatch & state.
  const dispatch = useDispatch();
  // ===== General state.
  const activeUser = useSelector(state => state.user.activeUser);
  const commentsData = useSelector(state => state.comments.commentsData.comments);
  // ===== Edit state.
  const editStarted = useSelector(state => state.edit.edit);
  const editPostId = useSelector(state => state.edit.editId);
  const nestedEditStarted = useSelector(state => state.edit.nestedEdit);
  const nestedPostId = useSelector(state => state.edit.nestedCommentId);



  // ==================================== Start reply, display reply input box. ====================================
  const startPostReply = (postId, nestedPostId, postCreator, eventNature) => {
    dispatch(startReply({id: postId, nestedId: nestedPostId, user: postCreator, replyPurpose: eventNature}));
  }



  // ==================================== Delete post. ====================================
  const deletePost = (nestedBoolean, postId, nestedPostId) => {
    dispatch(openPopUp({isNested: nestedBoolean, mainId: postId, secondId: nestedPostId}));
  }



  // ==================================== Start editing post, display edit text box. ====================================
  const startEditing = (nestedBoolean, postId, nestedPostId) => {
    if (nestedBoolean) {
      dispatch(startNestedEdit({id: postId, isNested: true, nestedComId: nestedPostId}));
    } else {
      dispatch(startEdit({id: postId}));
    }
  }



  // ==================================== Confirm & update edited text. ====================================
  const confirmEditing = (nestedBoolean, updatedText) => {
    if (nestedBoolean) {
      // ======================== Nested post.
      let duplicateData = commentsData.slice(0);
      let parentComment = duplicateData.filter(el => el.id === editPostId)[0];
      let parentCommentReplies = parentComment.replies.slice(0);
      let targetElement = parentComment.replies.filter(el => el.id === nestedPostId)[0];

      const updatedTargetElement = {
        "id": targetElement.id,
        "content": updatedText.length === 0 ? targetElement.content : updatedText,
        "createdAt": "Today",
        "score": targetElement.score,
        "replyingTo": targetElement.replyingTo,
        "user": {
            "image": activeUser.image,
            "username": activeUser.username
        },
        "peopleWhoLiked": targetElement.peopleWhoLiked,
        "peopleWhoDisliked": targetElement.peopleWhoDisliked
      }

      parentCommentReplies.splice(parentComment.replies.indexOf(targetElement), 1, updatedTargetElement);

      const newParentElement = {
        "id": parentComment.id,
        "content": parentComment.content,
        "createdAt": parentComment.createdAt,
        "score": parentComment.score,
        "user": {
            "image": parentComment.user.image,
            "username": parentComment.user.username
        },
        "replies": parentCommentReplies,
        "peopleWhoLiked": parentComment.peopleWhoLiked,
        "peopleWhoDisliked": parentComment.peopleWhoDisliked
      }
  
      duplicateData.splice(duplicateData.indexOf(parentComment), 1, newParentElement);
      dispatch(changeCommentObject({data: {comments: duplicateData}}));
      dispatch(endEdit());
      
    } else {
      // ======================== Surface post.
      let duplicateData = commentsData.slice(0);
      let targetElement = duplicateData.filter(el => el.id === editPostId)[0];

      const newTargetElement = {
        "id": targetElement.id,
        "content": updatedText.length === 0 ? targetElement.content : updatedText,
        "createdAt": targetElement.createdAt,
        "score": targetElement.score,
        "user": {
            "image": targetElement.user.image,
            "username": targetElement.user.username
        },
        "replies": targetElement.replies,
        "peopleWhoLiked": targetElement.peopleWhoLiked,
        "peopleWhoDisliked": targetElement.peopleWhoDisliked
      }

      duplicateData.splice(duplicateData.indexOf(targetElement), 1, newTargetElement)
      dispatch(changeCommentObject({data: {comments: duplicateData}}));
      dispatch(endEdit());
    }
  }



  // ==================================== Cancel editing, close interactive text box. ====================================
  const cancelEditing = () => {
    dispatch(endEdit());
  }



  return (
    editStarted && editPostId === props.postId ? (
      /* ===== Update/Cancel buttons for normal comment ===== */
      <div className="action-container">
        <button className="action-btn cancel-btn" onClick={cancelEditing}><span><MdCancel /></span>Cancel</button>
        <button className="action-btn confirm-btn" onClick={() => confirmEditing(props.isNested, props.editedText)}>Update</button>
      </div>
    ) : nestedEditStarted && nestedPostId === props.nestedId ? (
      /* ===== Update/Cancel buttons for nested comment ===== */
      <div className="action-container">
        <button className="action-btn cancel-btn" onClick={cancelEditing}><span><MdCancel /></span>Cancel</button>
        <button className="action-btn confirm-btn" onClick={() => confirmEditing(props.isNested, props.editedText)}>Update</button>
      </div>
    ) : props.createdBy === activeUser.username ? (
      /* ===== Delete & Edit buttons for comments made by the active user ===== */
      <div className="action-container">
        <button className="action-btn delete-btn" onClick={() => deletePost(props.isNested, props.postId, props.nestedId)}><img src="./images/icon-delete.svg" alt="Arrow" />Delete</button>
        <button className="action-btn" onClick={() => startEditing(props.isNested, props.postId, props.nestedId)}><img src="./images/icon-edit.svg" alt="Arrow" />Edit</button>
      </div>
    ) : (
      /* ===== Reply button ===== */
      <div className="action-container">
        <button className="action-btn" onClick={() => startPostReply(props.postId, props.nestedId, props.createdBy, props.eventNature)}><img src="./images/icon-reply.svg" alt="Arrow" />Reply</button>
      </div>
    )
  )
}

export default Action;