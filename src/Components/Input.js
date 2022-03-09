import React, { useState } from 'react'
import UserAvatar from "../Assets/image-juliusomo.png";

function Input() {
    const [ comment, setComment ] = useState("");

    const handleChange = (e) => {
        setComment(e.target.value);
        console.log(comment);
    }

    return (
        <div className="input-container">
            <img src={UserAvatar} alt="User Avatar" className="user-avatar" />
            <textarea name="comment" value={comment} placeholder="Add a comment" onChange={handleChange} ></textarea>
            <button className="send-btn">Send</button>
            <div className="mobile-container">
                <img src={UserAvatar} alt="User Avatar" />
                <button className="send-btn mobile-send-btn">Send</button>
            </div>
        </div>
    )
}

export default Input