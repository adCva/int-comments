import React from 'react';
import { MdCancel } from "react-icons/md";
// ========= Redux.
import { useSelector, useDispatch } from 'react-redux';
import { endReply, updateText } from "../Features/replySlice";
import { changeCommentObject } from "../Features/commentSlice";
import { openSimplePop } from "../Features/deleteSlice";


function Reply(props) {
  // ================== Redux dispatch & state.
  const dispatch = useDispatch();
  // ===== Reply state.
  const replyId = useSelector(state => state.reply.replyId);
  const replyTo = useSelector(state => state.reply.replyTo);
  const replyTextState = useSelector(state => state.reply.replyText);
  // ===== General state.
  const commentsData = useSelector(state => state.comments.commentsData);
  const totalIds = useSelector(state => state.comments.totalIds);
  const activeUser = useSelector(state => state.user.activeUser);



  // ==================================== Handle local state change, textarea. ====================================
  const handleChange = (event) => {
    dispatch(updateText({newText: event.target.value}))
  }



  // ==================================== Cancel reply, close interactive text box. ====================================
  const closeReply = () => {
    if (replyTextState.length > 0) {
      dispatch(openSimplePop());
    } else {
      dispatch(endReply());
    }
  }



  // ==================================== Create & submit reply. ====================================
  const createReply = () => {
    let duplicateData = commentsData.comments.slice(0);
    let parentElement = duplicateData.filter(el => el.id === replyId)[0];

    const newReply = {
        "id": totalIds + 1,
        "content": replyTextState,
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
  }



  return (
    <div className={props.insideReply ? "nested-reply reply-input-wrapper" : "reply-input-wrapper"}>
        {/* ============= Avatar, for big screens ============= */}
        <img src="./images/avatars/image-juliusomo.png" alt="User Avatar" className="user-avatar-big" />
        {/* ============= Username & Textarea ============= */}
        <div className="textarea-container">
            <p>@{replyTo}, </p>
            <textarea name="comment" value={replyTextState} onChange={handleChange} />
        </div>

        {/* ============= Div (special-container) used for mobile design purposes, otherwise use just reply-buttons ============= */}
        <div className="special-container">
            {/* ============= Avatar, for big mobile ============= */}
            <img src="./images/avatars/image-juliusomo.png" alt="User Avatar" className="user-avatar-small" />

            {/* ============= Buttons ============= */}
            <div className="action-container action-container-column">
              <button className="action-btn cancel-btn" onClick={closeReply}><span><MdCancel /></span>Cancel</button>
              {replyTextState.length > 0 ? (
                <button className="action-btn confirm-btn" onClick={createReply}>Reply</button>
              ) : (
                <button className="action-btn confirm-btn disabled-btn">Reply</button>
              )}
            </div>
        </div>
    </div>
  )
}

export default Reply;