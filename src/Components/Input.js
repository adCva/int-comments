import React, { useState } from 'react'
import UserAvatar from "../Assets/image-juliusomo.png";
import { useSelector, useDispatch } from 'react-redux';
import { addComment, addReply } from "../Features/dataSlice";
import { endReply } from "../Features/replySlice";

function Input() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.comments.currentUser);
    const ids = useSelector(state => state.comments.totalIds);
    const dataFile = useSelector(state => state.comments.commentsData);
    // *
    const reply = useSelector(state => state.reply.reply);
    const replyId = useSelector(state => state.reply.replyId);
    const replyTo = useSelector(state => state.reply.replyTo);
    // *
    const edit = useSelector(state => state.edit.edit);
    const editId = useSelector(state => state.edit.editId);
    const nestedEdit = useSelector(state => state.edit.nestedEdit);
    const nestedEditCommentId = useSelector(state => state.edit.nestedCommentId);


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
            <textarea name="comment" value={edit ? "test" : comment} placeholder="Add a comment" onChange={handleChange} ></textarea>
            {reply ? (
                <button className="send-btn" onClick={createReply}>Reply</button>
            ) : edit ? (
                <button className="send-btn" onClick={createComment}>Edit</button>
            ) : (
                <button className="send-btn" onClick={createComment}>Send</button>
            )}
            <div className="mobile-container">
                <img src={UserAvatar} alt="User Avatar" />
                {reply ? (
                    <button className="send-btn mobile-send-btn" onClick={createReply}>Reply</button>
                ) : edit ? (
                    <button className="send-btn mobile-send-btn" onClick={createComment}>Edit</button>
                ) : (
                    <button className="send-btn mobile-send-btn" onClick={createComment}>Send</button>
                )}
            </div>
        </div>
    )
}

export default Input