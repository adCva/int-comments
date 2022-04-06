import React, { useState } from 'react';
import { MdCancel } from "react-icons/md";
// ========= Redux.
import { useSelector, useDispatch } from 'react-redux';
import { endReply } from "../Features/replySlice";
import { changeCommentObject } from "../Features/commentSlice";


function Reply(props) {
  // ================== Redux dispatch,state & local state.
  const dispatch = useDispatch();
  // ===== Reply state.
  const replyId = useSelector(state => state.reply.replyId);
  const replyTo = useSelector(state => state.reply.replyTo);
  // ===== General state.
  const commentsData = useSelector(state => state.comments.commentsData);
  const totalIds = useSelector(state => state.comments.totalIds);
  const activeUser = useSelector(state => state.user.activeUser);
  // ===== Local state.
  const [ replyText, setReplyText ] = useState("");



  // ==================================== Handle local state change, textarea. ====================================
  const handleChange = (event) => {
    setReplyText(event.target.value);
  }



  // ==================================== Cancel reply, close interactive text box. ====================================
  const closeReply = () => {
    if (replyText.length > 0) {
      // ======================== User wants to close box when there is text present.
      let confirmChoice = window.confirm("Are you sure you want to delete this comment? All progress will be lost");
      if (confirmChoice) {
        dispatch(endReply())
        setReplyText("");
      }
    } else {
      // ======================== Direct close box.
      dispatch(endReply());
      setReplyText("");
    }
  }



    // ==================================== Create & submit reply. ====================================
  const createReply = () => {
    let duplicateData = commentsData.comments.slice(0);
    let parentElement = duplicateData.filter(el => el.id === replyId)[0];

    const newReply = {
        "id": totalIds + 1,
        "content": replyText,
        "createdAt": "Today",
        "score": 0,
        "replyingTo": replyTo,
        "user": {
            "image": activeUser.image,
            "username": activeUser.username
        },
        "peopleWhoLiked": [],
        "peopleWhoDisliked": []
    }

    const updatedParentObject = {
        "id": parentElement.id,
        "content": parentElement.content,
        "createdAt": parentElement.createdAt,
        "score": parentElement.score,
        "user": {
            "image": parentElement.user.image,
            "username": parentElement.user.username
        },
        "replies": [...parentElement.replies, newReply],
        "peopleWhoLiked": parentElement.peopleWhoLiked,
        "peopleWhoDisliked": parentElement.peopleWhoDisliked
    }

    duplicateData.splice(duplicateData.indexOf(parentElement), 1, updatedParentObject)
    dispatch(changeCommentObject({data: {comments: duplicateData}}));
    dispatch(endReply());
    setReplyText("");
  }



  return (
    <div className={props.insideReply ? "nested-reply reply-input-wrapper" : "reply-input-wrapper"}>
        {/* ============= Avatar, for big screens ============= */}
        <img src="./images/avatars/image-juliusomo.png" alt="User Avatar" className="user-avatar-big" />
        {/* ============= Username & Textarea ============= */}
        <div className="textarea-container">
            <p>@{replyTo}, </p>
            <textarea name="comment" value={replyText} onChange={handleChange} />
        </div>

        {/* ============= Div (special-container) used for mobile design purposes, otherwise use just reply-buttons ============= */}
        <div className="special-container">
            {/* ============= Avatar, for big mobile ============= */}
            <img src="./images/avatars/image-juliusomo.png" alt="User Avatar" className="user-avatar-small" />

            {/* ============= Buttons ============= */}
            <div className="action-container action-container-column">
            <button className="action-btn cancel-btn" onClick={closeReply}><span><MdCancel /></span>Cancel</button>
              <button className="action-btn confirm-btn" onClick={createReply}>Reply</button>
            </div>
        </div>
    </div>
  )
}

export default Reply;