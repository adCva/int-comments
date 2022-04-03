import React, { useState } from "react";
// ========= Redux.
import { useSelector, useDispatch } from 'react-redux';
import { addComment } from "../Features/commentSlice";

function Input() {
    const dispatch = useDispatch();
    const activeUser = useSelector(state => state.user.activeUser);
    const totalIds = useSelector(state => state.comments.totalIds);
    const commentsData = useSelector(state => state.comments.commentsData);
    const [ comment, setComment ] = useState("");

    const handleChange = (e) => {
        setComment(e.target.value);
    }


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
            "replies": []
        }
        let newObjData = {comments: [...commentsData.comments, newComment]};
        dispatch(addComment({data: newObjData}));
    };

  return (
    <div className="input-container">
        <img src={activeUser.image} alt="User Avatar" className="user-avatar" />
        <textarea name="comment" value={comment} placeholder="Add a comment" onChange={handleChange} ></textarea>
        <button className="send-btn" onClick={createComment}>Send</button>
        <div className="mobile-container">
            <img src={activeUser.image} alt="User Avatar" />
            <button className="send-btn mobile-send-btn" onClick={createComment}>Send</button>
        </div>
    </div>
  )
}

export default Input;