import React from 'react';
import ReplyIcon from "../Assets/icon-reply.svg";
import EditIcon from "../Assets/icon-edit.svg";
import DeleteIcon from "../Assets/icon-delete.svg";
import { useSelector, useDispatch } from 'react-redux';
import { deleteComment } from "../Features/dataSlice";
import { startReply } from "../Features/replySlice";
import {startEdit } from "../Features/editSlice";
import Reply from './Reply';
import Edit from './Edit';

function Comment() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.comments.currentUser);
    const dataFile = useSelector(state => state.comments.commentsData.comments);
    const editId = useSelector(state => state.edit.editId);
    const replyId = useSelector(state => state.reply.editId);
    const replyIdd = useSelector(state => state.reply.replyId);

    const deleteSelectedComment = (id) => {
        let confirmChoice = window.confirm("Are you sure you want to delete this comment?");
        if (confirmChoice) {
            let updatedCommentsObj =  dataFile.filter(el => el.id !== id);
            dispatch(deleteComment({data: updatedCommentsObj}));
        }

    }

    const deleteSelectedReply = (commentId, replyId) => {
        let confirmChoice = window.confirm("Are you sure you want to delete this comment?");

        if (confirmChoice) {
            let duplicateData = dataFile.slice(0);
            let mainComment = duplicateData.filter(el => el.id === commentId)[0];
            let remainingReplyies = duplicateData.filter(el => el.id === commentId)[0].replies.filter(rep => rep.id !== replyId);
            const newComment = {
                "id": mainComment.id,
                "content": mainComment.content,
                "createdAt": mainComment.createdAt,
                "score": mainComment.score,
                "user": {
                    "image": mainComment.user.image,
                    "username": mainComment.user.username
                },
                "replies": remainingReplyies
            }
            
            duplicateData.splice(duplicateData.indexOf(mainComment), 1, newComment)
            dispatch(deleteComment({data: duplicateData}));
        }
    }


    const addReply = (replyId, replyTo) => {
        let commentId = replyId;
        let replyUser = replyTo;
        
        dispatch(startReply({id: commentId, user: replyUser}));
    }


    const openEdit = (nested, nestedId, elementId, textToEdit) => {
        if (nested) {
            dispatch(startEdit({id: elementId, isNested: nested, nestedComId: nestedId, text: textToEdit}));
        } else {
            dispatch(startEdit({id: elementId, isNested: false, nestedComId: null, text: textToEdit}));
        }
    }



    return (
        dataFile.map((el, i) => {
            return (
                <div className="comment-wrapper" key={i}>
                    <div className="comment-container">
                        <div className="likes-interactive">
                            <button className="engagement-btn">+</button>
                            <p className="counter">{el.score}</p>    
                            <button className="engagement-btn">-</button>    
                        </div>
                        <div className="comment-text">
                            <div className="identifiers">
                                <img src={el.user.image} alt="Avatar" />
                                <h1>{el.user.username}</h1>
                                <p>{el.createdAt}</p>    
                            </div>   
                            <p className="main-comment">{el.content}</p>  
                        </div>
                        <div>
                            {el.user.username === user.username ? (
                                <div className="user-interaction">
                                    <button className="delete-btn" onClick={() => deleteSelectedComment(el.id)}><img src={DeleteIcon} alt="Arrow" /> Delete</button>
                                    <button className="edit-btn" onClick={() => openEdit(el.id, false, null, el.content)}><img src={EditIcon} alt="Arrow" /> Edit</button>
                                </div>
                            ) : (
                                <button className="reply-btn" onClick={() => addReply(el.id, el.user.username)}><img src={ReplyIcon} alt="Arrow" /> Reply</button>
                            )}
                        </div>
                    </div>
                    {el.replies.length > 0 ? (
                        el.replies.map((rep, j) => {
                            return (
                                <div className="sub-comments-container" key={j}>
                                    <div className="sub-comment comment-container">
                                        <div className="likes-interactive">
                                            <button className="engagement-btn">+</button>
                                            <p className="counter">{rep.score}</p>    
                                            <button className="engagement-btn">-</button>    
                                        </div>
                                        <div className="comment-text">
                                            <div className="identifiers">
                                                <img src={rep.user.image} alt="Avatar" />
                                                <h1>{rep.user.username}</h1>
                                                <p>{rep.createdAt}</p>    
                                            </div>
                                            {editId === rep.id ? (
                                                <Edit />
                                            ) : (
                                                <p className="main-comment"><span className="reply-To">@{rep.replyingTo}</span> {rep.content}</p> 
                                            )}
                                        </div>
                                            {rep.user.username === user.username ? (
                                                <div className="user-interaction">
                                                    <button className="delete-btn" onClick={() => deleteSelectedReply(el.id, rep.id)}><img src={DeleteIcon} alt="Arrow" /> Delete</button>
                                                    <button className="edit-btn" onClick={() => openEdit(rep.id, true, el.id, rep.content)}><img src={EditIcon} alt="Arrow" /> Edit</button>
                                                </div>
                                            ) : (
                                                <button className="reply-btn" onClick={() => addReply(el.id, rep.user.username)}><img src={ReplyIcon} alt="Arrow" /> Reply</button>
                                            )}
                                    </div>
                                </div>
                            )
                        })
                    ) : null}
                    
                    {replyIdd === el.id ? (
                        <Reply />
                    ) : null}
                </div>
            )
        })
    )
}

export default Comment;
