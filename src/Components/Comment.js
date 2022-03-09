import React from 'react';
import ReplyIcon from "../Assets/icon-reply.svg";
import EditIcon from "../Assets/icon-edit.svg";
import DeleteIcon from "../Assets/icon-delete.svg";
import dataFile from "../data.json";

function Comment() {
  return (
    dataFile.comments.map((el, i) => {
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
                            <img src={el.user.image.png} alt="Avatar" />
                            <h1>{el.user.username}</h1>
                            <p>{el.createdAt}</p>    
                        </div>   
                        <p className="main-comment">{el.content}</p>  
                    </div>
                    <button className="reply-btn"><img src={ReplyIcon} alt="Arrow" /> Reply</button>
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
                                            <img src={rep.user.image.png} alt="Avatar" />
                                            <h1>{rep.user.username}</h1>
                                            <p>{rep.createdAt}</p>    
                                        </div>   
                                        <p className="main-comment"><span className="reply-To">@{rep.replyingTo}</span> {rep.content}</p>  
                                    </div>
                                        {rep.user.username === dataFile.currentUser.username ? (
                                            <div className="user-interaction">
                                                <button className="delete-btn"><img src={DeleteIcon} alt="Arrow" /> Delete</button>
                                                <button className="edit-btn"><img src={EditIcon} alt="Arrow" /> Edit</button>
                                            </div>
                                        ) : (
                                            <button className="reply-btn"><img src={ReplyIcon} alt="Arrow" /> Reply</button>
                                        )}
                                </div>
                            </div>
                        )
                    })
                ) : null}
            </div>
        )
    })
  )
}

export default Comment;
