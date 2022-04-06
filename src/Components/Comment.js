import React, { useState } from 'react';
import Reply from './Reply';
import Likes from "./Likes";
import Identifier from "./Identifier";
// =========== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { startReply } from "../Features/replySlice";
import { startEdit, startSimpleEdit, endEdit } from "../Features/editSlice";
import { editComment, deleteComment } from "../Features/commentSlice";
import Action from './Action';




function Comment() {
  const dispatch = useDispatch();
  const [ editTextBox, setEditTextBox ] = useState("");

  // ================== Redux state.
  const activeUser = useSelector(state => state.user.activeUser);
  const comments = useSelector(state => state.comments.commentsData.comments);
  const replyId = useSelector(state => state.reply.replyId);
  const nestedId = useSelector(state => state.reply.nestedReplyId);
  const purpose = useSelector(state => state.reply.purpose);
  const nestedEdit = useSelector(state => state.edit.nestedEdit);
  const editStarted = useSelector(state => state.edit.edit);
  const editId = useSelector(state => state.edit.editId);
  const nestedCommentId = useSelector(state => state.edit.nestedCommentId);
  const isLiked = useSelector(state => state.comments.liked);


  const handleChange = (e) => {
    setEditTextBox(e.target.value);
  }



  // ================== Start Reply.
  const startCommentReply = (replyPlace, nestedReplyId, replyTo, eventPuropese) => {
    dispatch(startReply({id: replyPlace, nestedId: nestedReplyId, user: replyTo, replyPurpose: eventPuropese}));
  }

  // ================== Start Reply to a reply.
  const startSubCommentReply = (replyPlace, nestedReplyId, replyTo, eventPuropese) => {
    dispatch(startReply({id: replyPlace, nestedId: nestedReplyId, user: replyTo, replyPurpose: eventPuropese}));
  }




  const startSimpleEdit = (mainId) => {
    dispatch(startSimpleEdit({id: mainId}));
  }
  const startNestedEdit = (mainId, isNestedValue, nestedId) => {
    dispatch(startEdit({id: mainId, isNested: isNestedValue, nestedComId: nestedId}));
  }
  


  const editSelectedComment = (nested) => {
    if (nested) {
      let duplicateData = comments.slice(0);
      let mainComment = duplicateData.filter(el => el.id === editId)[0];
      let mainCommentReplies = mainComment.replies.slice(0);
      let editedReplyId = mainComment.replies.filter(el => el.id === nestedCommentId)[0];
  
      const editedInfo = {
        "id": editedReplyId.id,
        "content": editTextBox,
        "createdAt": "Today",
        "score": editedReplyId.score,
        "replyingTo": editedReplyId.replyingTo,
        "user": {
            "image": activeUser.image,
            "username": activeUser.username
        }
      }
  
      mainCommentReplies.splice(mainComment.replies.indexOf(editedReplyId), 1, editedInfo);
  
      const newObject = {
        "id": mainComment.id,
        "content": mainComment.content,
        "createdAt": mainComment.createdAt,
        "score": mainComment.score,
        "user": {
            "image": mainComment.user.image,
            "username": mainComment.user.username
        },
        "replies": mainCommentReplies
    }
  
    duplicateData.splice(duplicateData.indexOf(mainComment), 1, newObject)
    let resault = {comments: duplicateData}
    dispatch(editComment({data: resault}));
    dispatch(endEdit());

    } else {
      let duplicateData = comments.slice(0);
      let mainComment = duplicateData.filter(el => el.id === editId)[0];
      console.log(mainComment);

      const newObject = {
        "id": mainComment.id,
        "content": editTextBox,
        "createdAt": mainComment.createdAt,
        "score": mainComment.score,
        "user": {
            "image": mainComment.user.image,
            "username": mainComment.user.username
        },
        "replies": mainComment.replies
      }

      duplicateData.splice(duplicateData.indexOf(mainComment), 1, newObject)
      let resault = {comments: duplicateData}
      dispatch(editComment({data: resault}));
      dispatch(endEdit());
    }
  }



  const closeEdit = () => {
    dispatch(endEdit());
  }


  const addLike = (id) => {
    let duplicateData = comments.slice(0);
    let targetElement = duplicateData.filter(el => el.id === id)[0];

    if (isLiked) {
      alert("You have already liked this!");
    } else {
      let newScore = targetElement.score + 1;
      const newObject = {
        "id": targetElement.id,
        "content": targetElement.content,
        "createdAt": targetElement.createdAt,
        "score": newScore,
        "user": {
            "image": targetElement.user.image,
            "username": targetElement.user.username
        },
        "replies": targetElement.replies
      }

      duplicateData.splice(duplicateData.indexOf(targetElement), 1, newObject)
      let resault = {comments: duplicateData}
      dispatch(editComment({data: resault}));
    }
  }


  const addNestedLike = (mainId, nestedId) => {
    let duplicateData = comments.slice(0);
    let targetElement = duplicateData.filter(el => el.id === mainId)[0];
    let mainCommentReplies = targetElement.replies.slice(0);
    let subElement = targetElement.replies.filter(el => el.id === nestedId)[0];
    console.log(subElement);
    let newScore = subElement.score + 1;

    const editedInfo = {
      "id": subElement.id,
      "content": subElement.content,
      "createdAt": subElement.createdAt,
      "score": newScore,
      "replyingTo": subElement.replyingTo,
      "user": {
          "image": subElement.user.image,
          "username": subElement.user.username
      }
    }

    mainCommentReplies.splice(targetElement.replies.indexOf(subElement), 1, editedInfo);

      const newObject = {
        "id": targetElement.id,
        "content": targetElement.content,
        "createdAt": targetElement.createdAt,
        "score": targetElement.score,
        "user": {
            "image": targetElement.user.image,
            "username": targetElement.user.username
        },
        "replies": mainCommentReplies
      }

      duplicateData.splice(duplicateData.indexOf(targetElement), 1, newObject)
      let resault = {comments: duplicateData}
      dispatch(editComment({data: resault}));
  }





  const dislike = (id) => {
    let duplicateData = comments.slice(0);
    let targetElement = duplicateData.filter(el => el.id === id)[0];

    if (isLiked) {
      alert("You have already liked this!");
    } else {
      let newScore = targetElement.score - 1;
      const newObject = {
        "id": targetElement.id,
        "content": targetElement.content,
        "createdAt": targetElement.createdAt,
        "score": newScore,
        "user": {
            "image": targetElement.user.image,
            "username": targetElement.user.username
        },
        "replies": targetElement.replies
      }

      duplicateData.splice(duplicateData.indexOf(targetElement), 1, newObject)
      let resault = {comments: duplicateData}
      dispatch(editComment({data: resault}));
    }
  }
  const addNestedDislike = (mainId, nestedId) => {
    let duplicateData = comments.slice(0);
    let targetElement = duplicateData.filter(el => el.id === mainId)[0];
    let mainCommentReplies = targetElement.replies.slice(0);
    let subElement = targetElement.replies.filter(el => el.id === nestedId)[0];
    console.log(subElement);
    let newScore = subElement.score - 1;

    const editedInfo = {
      "id": subElement.id,
      "content": subElement.content,
      "createdAt": subElement.createdAt,
      "score": newScore,
      "replyingTo": subElement.replyingTo,
      "user": {
          "image": subElement.user.image,
          "username": subElement.user.username
      }
    }

    mainCommentReplies.splice(targetElement.replies.indexOf(subElement), 1, editedInfo);

      const newObject = {
        "id": targetElement.id,
        "content": targetElement.content,
        "createdAt": targetElement.createdAt,
        "score": targetElement.score,
        "user": {
            "image": targetElement.user.image,
            "username": targetElement.user.username
        },
        "replies": mainCommentReplies
      }

      duplicateData.splice(duplicateData.indexOf(targetElement), 1, newObject)
      let resault = {comments: duplicateData}
      dispatch(editComment({data: resault}));
  }


const deleteSelectedReply = (commentId, replyId) => {
    let confirmChoice = window.confirm("Are you sure you want to delete this comment?");

    if (confirmChoice) {
        let duplicateData = comments.slice(0);
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

const deleteSelectedComment = (id) => {
  let confirmChoice = window.confirm("Are you sure you want to delete this comment?");
  if (confirmChoice) {
      let updatedCommentsObj =  comments.filter(el => el.id !== id);
      dispatch(deleteComment({data: updatedCommentsObj}));
  }

}



  return (
      comments.map((comment, i) => {
        return (
          <div className="comment-wrapper" key={i}>
            <div className="comment-details-container">
              {/* ============= Likes & Dislikes ============= */}
              <Likes commentScore={comment.score} commentId={comment.id} isCommentNested={false} nestedId={null} interacted={comment.peopleWhoLiked.includes(activeUser.username) ? "like" : comment.peopleWhoDisliked.includes(activeUser.username) ? "dislike" : ""} createdBy={comment.user.username}/>


              {/* ============= Main Comment Text ============= */}
              <div className="comment-text">
                <Identifier userAvatar={comment.user.image} creatorUsername={comment.user.username} elapsedTime={comment.createdAt} />
                {editStarted && editId === comment.id ? (
                  <textarea defaultValue={comment.content} onChange={handleChange}></textarea>
                ) : (
                  <p className="main-comment">{comment.content}</p>  
                )}     
              </div>

              {/* ============= Buttons: Reply, Edit & Delete ============= */}
              <div>
                        {/* editStarted && editId === comment.id ? (
                          <div className="user-interaction">
                            <button className="reply-btn" onClick={() => editSelectedComment(false)}>Confirm</button>
                            <button className="edit-btn" onClick={closeEdit}>Cancel</button>
                          </div>
                        ) : comment.user.username === activeUser.username ? (
                          <div className="user-interaction">
                            <button className="delete-btn" onClick={() => deleteSelectedComment(comment.id)}>Delete</button>
                            <button className="edit-btn" onClick={() => startSimpleEdit(comment.id)}>Edit</button>
                          </div>
                        ) : (
                          <button className="reply-btn" onClick={() => startCommentReply(comment.id, null, comment.user.username, "comment")}>Reply</button>
                        ) */}
                <Action postId={comment.id} isNested={false} nestedId={null} createdBy={comment.user.username} eventNature="comment" editedText={editTextBox} />
              </div>
            </div>

            {/* ============= Reply Input Box ============= */}
            <div className={replyId === comment.id && purpose === "comment" ? "reply-box" : "hide-reply-box"}>
              <Reply insideReply={false} />
            </div>

            {/* ============= Replys ============= */}
            {comment.replies.length > 0 ? (
              comment.replies.map((reply, j) => {
                return (
                  <div className="replies-wrapper" key={j}>
                    <div className="reply-container">
                      {/* ============= Likes & Dislikes ============= */}
                      {/*
                        <div className="likes-interactive">
                          <button className="engagement-btn" onClick={() => addNestedLike(comment.id, reply.id)}>+</button>
                          <p className="counter">{reply.score}</p>    
                          <button className="engagement-btn" onClick={() => addNestedDislike(comment.id, reply.id)}>-</button>    
                        </div>    
                      */}
                      <Likes commentScore={reply.score} commentId={comment.id} isCommentNested={true} nestedId={reply.id} interacted={reply.peopleWhoLiked.includes(activeUser.username) ? "like" : reply.peopleWhoDisliked.includes(activeUser.username) ? "dislike" : ""} createdBy={reply.user.username} />
                    
                      {/* ============= Main Comment Text ============= */}
                      <div className="comment-text">
                        <Identifier userAvatar={reply.user.image} creatorUsername={reply.user.username} elapsedTime={reply.createdAt} />
                        {nestedEdit && nestedCommentId === reply.id ? (
                          <textarea defaultValue={reply.content} onChange={handleChange}></textarea>
                        ) : (
                          <p className="main-comment"><span className="reply-To">@{reply.replyingTo}</span> {reply.content}</p> 
                        )}    
                      </div>

                      {/* ============= Buttons: Reply, Edit & Delete ============= */}
                      <div>
                        {/*nestedEdit && nestedCommentId === reply.id ? (
                          <div className="user-interaction">
                            <button className="reply-btn" onClick={() => editSelectedComment(true)}>Confirm</button>
                            <button className="edit-btn" onClick={closeEdit}>Cancel</button>
                          </div>
                        ) : reply.user.username === activeUser.username ? (
                          <div className="user-interaction">
                            <button className="delete-btn" onClick={() => deleteSelectedReply(comment.id, reply.id)}>Delete</button>
                            <button className="edit-btn" onClick={() => startNestedEdit(comment.id, true, reply.id)}> Edit</button>
                          </div>
                        ) : (
                          <button className="reply-btn" onClick={() => startSubCommentReply(comment.id, reply.id, reply.user.username, "reply-to-reply")}>Reply</button>
                        )*/}
                        <Action postId={comment.id} isNested={true} nestedId={reply.id} createdBy={reply.user.username} eventNature="reply-to-reply" editedText={editTextBox} />
                      </div>
                    </div>

                    {/* ============= Reply Input Box ============= */}
                    <div className={nestedId === reply.id && purpose === "reply-to-reply" ? "reply-box" : "hide-reply-box"}>
                      <Reply insideReply={true} />
                    </div>
                  </div>
                )
              })
            ) :null}
          </div>
        )
      })
    
  )
}

export default Comment;