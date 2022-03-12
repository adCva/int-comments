import React, { useState, useEffect, useRef } from 'react';
import { RiSendPlaneFill, RiCloseCircleFill } from "react-icons/ri";
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { addReply } from "../Features/dataSlice";
import { endReply } from "../Features/actionSlice";

function Reply() {
    // =================== Redux state & dispatch.
    const dispatch = useDispatch();
    // General state.
    const objectData = useSelector(state => state.comments.commentsData);
    const totalIds = useSelector(state => state.comments.totalIds);
    const activeUser = useSelector(state => state.user.activeUser);
    // Reply state.
    const replyId = useSelector(state => state.actions.replyId);
    const replyTo = useSelector(state => state.actions.replyTo);

    // =================== Local state & ref.
    const [ replyText, setReplyText ] = useState("");
    const replyContainerRef = useRef();


    // =================== Handle change.
    const handleReplyChange = (e) => {
        setReplyText(e.target.value);
    }


    const createReply = () => {
        let duplicateData = objectData.comments.slice(0);
        let mainComment = duplicateData.filter(el => el.id === replyId)[0];
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


    useEffect(() => {
        let closeOutsideClick = (e) => {
            // Todo: Ask for a confirm before closing.
            if (!replyContainerRef.current.contains(e.target)) {
                dispatch(endReply());
            }
        }

        document.addEventListener("click", closeOutsideClick);
        return() => {
            document.removeEventListener("click", closeOutsideClick);
        }
    });


    return (
        <div className="reply-input-container" ref={replyContainerRef}>
            <div className="avatar-container">
                <img src={activeUser.image} alt="User Avatar" className="user-avatar" />
                <p className="reply-To">Replying to: <span>@{replyTo}</span></p>
            </div>
            <div className="reply-interactive">
                <textarea name="comment" value={replyText} placeholder="Add a reply" onChange={handleReplyChange} ></textarea>
                <div className="reply-btns-container">
                    <button className="send-reply-btn" onClick={createReply}><RiSendPlaneFill /></button>
                    <button className="close-reply-btn" onClick={() => dispatch(endReply())}><RiCloseCircleFill /></button>
                </div>
            </div>
        </div>
    )
}

export default Reply;