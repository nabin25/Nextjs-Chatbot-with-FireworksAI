import React from 'react'
import './Message.css'

const Message = ({role, content}) => {
  return (
    <div className={`message message-${role}`}>
      {
        role!=="system"&&content!==""?
        <div className={`message-div ${role}`}>
        <p>{content}</p>
        </div>
        :
        ""
      }
    </div>    
  )
}

export default Message