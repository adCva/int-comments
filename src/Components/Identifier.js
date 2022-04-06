import React from 'react';
// =========== Redux.
import { useSelector } from 'react-redux';



function Identifier(props) {
    // ================== Redux state.
    const activeUser = useSelector(state => state.user.activeUser);


  return (
    <div className="identifiers-container">
      <img src={props.userAvatar} alt="Avatar" />
      <h1>{props.creatorUsername}</h1>
      {props.creatorUsername === activeUser.username ? (<span className="highline">you</span>) : null}
      <p>{props.elapsedTime}</p>   
    </div>
  )
}

export default Identifier;