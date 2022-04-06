import React, { useState } from "react";
// ========= Redux.
import { useSelector, useDispatch } from 'react-redux';
import { addComment } from "../Features/commentSlice";

function Input() {
    // ================== Redux dispatch & state.
    const dispatch = useDispatch();
    const activeUser = useSelector(state => state.user.activeUser);
    const totalIds = useSelector(state => state.comments.totalIds);
    const commentsData = useSelector(state => state.comments.commentsData);
    const [ comment, setComment ] = useState("");



    // ==================================== Handle local state change, textarea. ====================================
    const handleChange = (e) => {
        setComment(e.target.value);
    }



    // ==================================== Create comment. ====================================
    const createComment = () => {
        const newComment = {
            "id": totalIds + 1,
            "content": comment,
            "createdAt": "Today",
            "score": 0,
            "user": {
                "image": activeUser.image,
                "username": activeUser.username
            },
            "replies": [],
            "peopleWhoLiked": [],
            "peopleWhoDisliked": []
        }
        dispatch(addComment({data: {comments: [...commentsData.comments, newComment]}}));
        setComment("");
    };



  return (
    <div className="input-container">
        {/* ============= Avatar, for big screens ============= */}
        <img src={activeUser.image} alt="User Avatar" className="user-avatar" />
        {/* ============= Textarea ============= */}
        <textarea name="comment" value={comment} placeholder="Add a comment" onChange={handleChange} ></textarea>
        {/* ============= Send button, for big screens ============= */}
        <button className="send-btn" onClick={createComment}>Send</button>
        {/* ============= Avatar & send button for mobile ============= */}
        <div className="mobile-container">
            <img src={activeUser.image} alt="User Avatar" />
            <button className="send-btn mobile-send-btn" onClick={createComment}>Send</button>
        </div>
    </div>
  )
}

export default Input;