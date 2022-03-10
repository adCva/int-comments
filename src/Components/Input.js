import React, { useState } from 'react'
import UserAvatar from "../Assets/image-juliusomo.png";
import { useSelector, useDispatch } from 'react-redux';
import { addComment, addReply } from "../Features/dataSlice";
import { endReply } from "../Features/actionSlice";

function Input() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.comments.currentUser);
    const ids = useSelector(state => state.comments.totalIds);
    const dataFile = useSelector(state => state.comments.commentsData);
    const reply = useSelector(state => state.actions.reply);
    const replyId = useSelector(state => state.actions.replyId);
    const replyTo = useSelector(state => state.actions.replyTo);
    const [ comment, setComment ] = useState("");

    const handleChange = (e) => {
        setComment(e.target.value);
    }


    const createComment = () => {
        const newComment = {
            "id": ids + 1,
            "content": comment,
            "createdAt": "Today",
            "score": 0,
            "user": {
                "image": user.image,
                "username": user.username
            },
            "replies": []
        }
        let newObjData = {comments: [...dataFile.comments, newComment]};
        dispatch(addComment({data: newObjData}));
    };


    const createReply = () => {
        let duplicateData = dataFile.comments.slice(0);
        let mainComment = duplicateData.filter(el => el.id === replyId)[0];
        const newReply = {
            "id": ids + 1,
            "content": comment,
            "createdAt": "Today",
            "score": 0,
            "replyingTo": replyTo,
            "user": {
                "image": user.image,
                "username": user.username
            }
        }
        let mainReplies = [...mainComment.replies, newReply]


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
    }

    return (
        <div className="input-container">
            <img src={UserAvatar} alt="User Avatar" className="user-avatar" />
            <textarea name="comment" value={comment} placeholder="Add a comment" onChange={handleChange} ></textarea>
            {reply ? (
                <button className="send-btn" onClick={createReply}>Reply</button>
            ) : (
                <button className="send-btn" onClick={createComment}>Send</button>
            )}
            <div className="mobile-container">
                <img src={UserAvatar} alt="User Avatar" />
                {reply ? (
                    <button className="send-btn mobile-send-btn" onClick={createReply}>Reply</button>
                ) : (
                    <button className="send-btn mobile-send-btn" onClick={createComment}>Send</button>
                )}
            </div>
        </div>
    )
}

export default Input