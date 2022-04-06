import React, { useState } from 'react';
// =========== Components.
import Likes from "./Likes";
import Identifier from "./Identifier";
import Action from './Action';
import Reply from './Reply';
// =========== Redux.
import { useSelector } from 'react-redux';



function Card() {
  // ================== Redux dispatch,state & local state.
  // ===== General state.
  const activeUser = useSelector(state => state.user.activeUser);
  const commentsData = useSelector(state => state.comments.commentsData.comments);
  // ===== Edit state.
  const editStarted = useSelector(state => state.edit.edit);
  const nestedEdit = useSelector(state => state.edit.nestedEdit);
  const editId = useSelector(state => state.edit.editId);
  const nestedCommentId = useSelector(state => state.edit.nestedCommentId);
  // ===== Reply state.
  const purpose = useSelector(state => state.reply.purpose);
  const replyId = useSelector(state => state.reply.replyId);
  const nestedReplyId = useSelector(state => state.reply.nestedReplyId);
  // ===== Local state.
  const [ editTextBox, setEditTextBox ] = useState("");



  // ================== Handle change of local state.
  const handleChange = (e) => {
    setEditTextBox(e.target.value);
  }



  // ================== Return local state to empty string (editTextBox), prevents a bug where after updating a text, if the user clicks on update again without typing anything the content of this text will be that of the previous edited text.
  const makeEmptyString = () => {
    setEditTextBox("");
  }



  return (
    /* ============= Main comment map ============= */
    commentsData.map((comment, i) => {

      return(
        <div className="card-wrapper" key={i}>
          {/* ============= Main comment ============= */}
          <div className="card-container">

            {/* ============= Likes & Dislikes ============= */}
            <div className="card-likes">
              <Likes 
                commentScore={comment.score} 
                commentId={comment.id} 
                isCommentNested={false} 
                nestedId={null} 
                interacted={comment.peopleWhoLiked.includes(activeUser.username) ? "like" : comment.peopleWhoDisliked.includes(activeUser.username) ? "dislike" : ""} 
                createdBy={comment.user.username} 
              />
            </div>

            {/* ============= Main Comment Text ============= */}
            <div className="card-content">
              <div className="card-content-identifier">
                <Identifier 
                  userAvatar={comment.user.image} 
                  creatorUsername={comment.user.username} 
                  elapsedTime={comment.createdAt} 
                />
              </div>

              <div className="card-content-main-text">
                {editStarted && editId === comment.id ? (
                  <textarea defaultValue={comment.content} onChange={handleChange} className="edit-textarea"></textarea>
                ) : (
                  <p className="main-comment">{comment.content}</p>  
                )}  
              </div>
            </div>

            {/* ============= Buttons: Reply, Edit & Delete ============= */}
            <div className="card-buttons" onClick={() => editStarted || nestedEdit ? makeEmptyString() : null}>
              <Action 
                postId={comment.id} 
                isNested={false} 
                nestedId={null} 
                createdBy={comment.user.username} 
                eventNature="comment" 
                editedText={editTextBox} 
              />
            </div>

          </div>

          {/* ============= Main reply box ============= */}
          <div className={replyId === comment.id && purpose === "comment" ? "card-reply-box" : "hide-main-reply-box"}>
            <Reply insideReply={false} />
          </div>

          {/* ============= Replies to the comment map ============= */}
          {comment.replies.length > 0 ? (
            comment.replies.map((reply, j) => {
              return(
                /* ============= All replies wrapper ============= */
                <div className="card-replies-wrapper" key={j}>
                  {/* ============= Single reply box ============= */}
                  <div className="card-replies-container">

                    {/* ============= Single reply box container ============= */}
                    <div className="card-container">

                      {/* ============= Likes & Dislikes ============= */}
                      <div className="card-likes">
                        <Likes 
                          commentScore={reply.score} 
                          commentId={comment.id} 
                          isCommentNested={true} 
                          nestedId={reply.id} 
                          interacted={reply.peopleWhoLiked.includes(activeUser.username) ? "like" : reply.peopleWhoDisliked.includes(activeUser.username) ? "dislike" : ""} 
                          createdBy={reply.user.username} 
                        />
                      </div>

                      {/* ============= Main Comment Text ============= */}
                      <div className="card-content">
                        <div className="card-content-identifier">
                          <Identifier 
                            userAvatar={reply.user.image} 
                            creatorUsername={reply.user.username} 
                            elapsedTime={reply.createdAt} 
                          />
                        </div>

                        <div className="card-content-main-text">
                          {nestedEdit && nestedCommentId === reply.id ? (
                            <textarea defaultValue={reply.content} onChange={handleChange} className="edit-textarea"></textarea>
                          ) : (
                            <p className="main-comment"><span className="reply-To">@{reply.replyingTo}</span> {reply.content}</p> 
                          )}  
                        </div>
                      </div>

                      {/* ============= Buttons: Reply, Edit & Delete ============= */}
                      <div className="card-buttons" onClick={() => editStarted || nestedEdit ? makeEmptyString() : null}>
                        <Action 
                          postId={comment.id} 
                          isNested={true} 
                          nestedId={reply.id} 
                          createdBy={reply.user.username} 
                          eventNature="reply-to-reply" 
                          editedText={editTextBox} 
                        />
                      </div>

                    </div>

                    {/* ============= Nested reply box ============= */}
                    <div className={nestedReplyId === reply.id && purpose === "reply-to-reply" ? "card-reply-box" : "hide-main-reply-box"}>
                      <Reply insideReply={true} />
                    </div>

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

export default Card;