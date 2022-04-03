import React, { useState } from 'react';
// ========= Redux.
import { useSelector, useDispatch } from 'react-redux';
import { endReply } from "../Features/replySlice";
import { addReply } from "../Features/commentSlice";


function Reply(props) {
  const dispatch = useDispatch();

  // ================== Redux state.
  const replyId = useSelector(state => state.reply.replyId);
  const replyTo = useSelector(state => state.reply.replyTo);
  const commentsData = useSelector(state => state.comments.commentsData);
  const totalIds = useSelector(state => state.comments.totalIds);
  const activeUser = useSelector(state => state.user.activeUser);


  const [ replyText, setReplyText ] = useState("");

  const closeReply = () => {
    if (replyText.length > 0) {
      let confirmChoice = window.confirm("Are you sure you want to delete this comment? All progress will be lost");

      if (confirmChoice) {
        dispatch(endReply())
        setReplyText("");
      }
    } else {
      dispatch(endReply());
      setReplyText("");
    }
  }


  const handleChange = (event) => {
    setReplyText(event.target.value);
  }



  const createReply = () => {
    let duplicateData = commentsData.comments.slice(0);
    let mainComment = duplicateData.filter(el => el.id === replyId)[0];
    console.log(mainComment);
    const newReply = {
        "id": totalIds + 1,
        "content": replyText,
        "createdAt": "Today",
        "score": 0,
        "replyingTo": replyTo,
        "user": {
            "image": activeUser.image,
            "username": activeUser.username
        }
    }
    let mainReplies = [...mainComment.replies, newReply]
    console.log(mainReplies);

    const newObject = {
        "id": mainComment.id,
        "content": mainComment.content,
        "createdAt": mainComment.createdAt,
        "score": mainComment.score,
        "user": {
            "image": mainComment.user.image,
            "username": mainComment.user.username
        },
        "replies": mainReplies
    }

    duplicateData.splice(duplicateData.indexOf(mainComment), 1, newObject)
    dispatch(addReply({data: duplicateData}));
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
            <div className="reply-buttons">
                <button className="send-reply-btn" onClick={createReply}>Reply</button>
                <button className="close-reply-btn" onClick={closeReply}>Close</button>
            </div>
        </div>
    </div>
  )
}

export default Reply;