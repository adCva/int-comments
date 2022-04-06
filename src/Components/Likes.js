import React from 'react';
// =========== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { changeCommentObject } from "../Features/commentSlice";



function Likes(props) {
    // ================== Redux dispatch & state.
    const dispatch = useDispatch();
    const commentsData = useSelector(state => state.comments.commentsData.comments);
    const activeUser = useSelector(state => state.user.activeUser);



    // ==================================== Like. ====================================
    const likePost = (id, nestedPost, nestedPostId) => {
        if (nestedPost) {
            // ======================== Nested post like.
            let duplicateCommentsData = commentsData.slice(0);
            let parentElement = duplicateCommentsData.filter(el => el.id === id)[0];
            let parentElementReplies = parentElement.replies.slice(0);
            let targetElement = parentElement.replies.filter(el => el.id === nestedPostId)[0];

            const targetElementObject = {
                "id": targetElement.id,
                "content": targetElement.content,
                "createdAt": targetElement.createdAt,
                "score": targetElement.peopleWhoLiked.includes(activeUser.username) ? targetElement.score - 1 : targetElement.peopleWhoDisliked.includes(activeUser.username) ? targetElement.score + 2 : targetElement.score + 1,
                "replyingTo": targetElement.replyingTo,
                "user": {
                    "image": targetElement.user.image,
                    "username": targetElement.user.username
                },
                "peopleWhoLiked": targetElement.peopleWhoLiked.includes(activeUser.username) ? targetElement.peopleWhoLiked.filter(el => el !== activeUser.username) : [...targetElement.peopleWhoLiked, activeUser.username],
                "peopleWhoDisliked": targetElement.peopleWhoLiked.includes(activeUser.username) ? targetElement.peopleWhoDisliked : targetElement.peopleWhoDisliked.includes(activeUser.username) ? targetElement.peopleWhoDisliked.filter(el => el !== activeUser.username) : targetElement.peopleWhoDisliked
            }

            parentElementReplies.splice(parentElement.replies.indexOf(targetElement), 1, targetElementObject);
    
            const updatedParentElement = {
                "id": parentElement.id,
                "content": parentElement.content,
                "createdAt": parentElement.createdAt,
                "score": parentElement.score,
                "user": {
                    "image": parentElement.user.image,
                    "username": parentElement.user.username
                },
                "replies": parentElementReplies,
                "peopleWhoLiked": parentElement.peopleWhoLiked,
                "peopleWhoDisliked": parentElement.peopleWhoDisliked
            }

            duplicateCommentsData.splice(duplicateCommentsData.indexOf(parentElement), 1, updatedParentElement);
            dispatch(changeCommentObject({data: {comments: duplicateCommentsData}}));
                
        } else {
            // ======================== Surface post like.
            let duplicateCommentsData = commentsData.slice(0);
            let targetElement = duplicateCommentsData.filter(el => el.id === id)[0];

            const updatedElement = {
                "id": targetElement.id,
                "content": targetElement.content,
                "createdAt": targetElement.createdAt,
                "score": targetElement.peopleWhoLiked.includes(activeUser.username) ? targetElement.score - 1 : targetElement.peopleWhoDisliked.includes(activeUser.username) ? targetElement.score + 2 : targetElement.score + 1,
                "user": {
                    "image": targetElement.user.image,
                    "username": targetElement.user.username
                },
                "replies": targetElement.replies,
                "peopleWhoLiked": targetElement.peopleWhoLiked.includes(activeUser.username) ? targetElement.peopleWhoLiked.filter(el => el !== activeUser.username) : [...targetElement.peopleWhoLiked, activeUser.username],
                "peopleWhoDisliked": targetElement.peopleWhoLiked.includes(activeUser.username) ? targetElement.peopleWhoDisliked : targetElement.peopleWhoDisliked.includes(activeUser.username) ? targetElement.peopleWhoDisliked.filter(el => el !== activeUser.username) : targetElement.peopleWhoDisliked
            }

            duplicateCommentsData.splice(duplicateCommentsData.indexOf(targetElement), 1, updatedElement);
            dispatch(changeCommentObject({data: {comments: duplicateCommentsData}}));
        }
    };



    // ==================================== Dislike. ====================================
    const dislikePost = (id, nestedPost, nestedPostId) => {
        if (nestedPost) {
            // ======================== Nested post dislike.
            let duplicateCommentsData = commentsData.slice(0);
            let parentElement = duplicateCommentsData.filter(el => el.id === id)[0];
            let parentElementReplies = parentElement.replies.slice(0);
            let targetElement = parentElement.replies.filter(el => el.id === nestedPostId)[0];

            const targetElementObject = {
                "id": targetElement.id,
                "content": targetElement.content,
                "createdAt": targetElement.createdAt,
                "score": targetElement.peopleWhoDisliked.includes(activeUser.username) ? targetElement.score + 1 : targetElement.peopleWhoLiked.includes(activeUser.username) ? targetElement.score - 2 : targetElement.score - 1,
                "replyingTo": targetElement.replyingTo,
                "user": {
                    "image": targetElement.user.image,
                    "username": targetElement.user.username
                },
                "peopleWhoLiked": targetElement.peopleWhoDisliked.includes(activeUser.username) ? targetElement.peopleWhoLiked : targetElement.peopleWhoLiked.includes(activeUser.username) ? targetElement.peopleWhoLiked.filter(el => el !== activeUser.username) : targetElement.peopleWhoLiked,
                "peopleWhoDisliked": targetElement.peopleWhoDisliked.includes(activeUser.username) ? targetElement.peopleWhoDisliked.filter(el => el !== activeUser.username) : [...targetElement.peopleWhoDisliked, activeUser.username]
            }

            parentElementReplies.splice(parentElement.replies.indexOf(targetElement), 1, targetElementObject);

            const updatedParentElement = {
                "id": parentElement.id,
                "content": parentElement.content,
                "createdAt": parentElement.createdAt,
                "score": parentElement.score,
                "user": {
                    "image": parentElement.user.image,
                    "username": parentElement.user.username
                },
                "replies": parentElementReplies,
                "peopleWhoLiked": parentElement.peopleWhoLiked,
                "peopleWhoDisliked": parentElement.peopleWhoDisliked
            }

            duplicateCommentsData.splice(duplicateCommentsData.indexOf(parentElement), 1, updatedParentElement);
            dispatch(changeCommentObject({data: {comments: duplicateCommentsData}}));

        } else {
            // ======================== Surface post dislike.
            let duplicateCommentsData = commentsData.slice(0);
            let targetElement = duplicateCommentsData.filter(el => el.id === id)[0];

            const updatedElement = {
                "id": targetElement.id,
                "content": targetElement.content,
                "createdAt": targetElement.createdAt,
                "score": targetElement.peopleWhoDisliked.includes(activeUser.username) ? targetElement.score + 1 : targetElement.peopleWhoLiked.includes(activeUser.username) ? targetElement.score - 2 : targetElement.score - 1,
                "user": {
                    "image": targetElement.user.image,
                    "username": targetElement.user.username
                },
                "replies": targetElement.replies,
                "peopleWhoLiked": targetElement.peopleWhoDisliked.includes(activeUser.username) ? targetElement.peopleWhoLiked : targetElement.peopleWhoLiked.includes(activeUser.username) ? targetElement.peopleWhoLiked.filter(el => el !== activeUser.username) : targetElement.peopleWhoLiked,
                "peopleWhoDisliked": targetElement.peopleWhoDisliked.includes(activeUser.username) ? targetElement.peopleWhoDisliked.filter(el => el !== activeUser.username) : [...targetElement.peopleWhoDisliked, activeUser.username]
            }

            duplicateCommentsData.splice(duplicateCommentsData.indexOf(targetElement), 1, updatedElement);
            dispatch(changeCommentObject({data: {comments: duplicateCommentsData}}));
        }
    };




    return (
        <div className="likes-container">
            {/* ============== Like button ============== */}
            {props.createdBy === activeUser.username ? (
                <button className="engagement-btn engagement-btn-disabled">+</button>
            ) : (
                <button className={props.interacted === "like" ? "engagement-btn engagement-btn-interacted" : "engagement-btn"} onClick={() => likePost(props.commentId, props.isCommentNested, props.nestedId)}>+</button>
            )}
            
            {/* ============== Likes counter ============== */}  
            <p className="counter">{props.commentScore}</p>

            {/* ============== Dislike button ============== */}    
            {props.createdBy === activeUser.username ? (
                <button className="engagement-btn engagement-btn-disabled">-</button>
            ) : (
                <button className={props.interacted === "dislike" ? "engagement-btn engagement-btn-interacted" : "engagement-btn"} onClick={() => dislikePost(props.commentId, props.isCommentNested, props.nestedId)}>-</button> 
            )}
        </div>
    )
}

export default Likes;