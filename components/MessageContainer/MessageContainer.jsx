'use client'
import React from 'react'
import { StoreContext } from '@/app/context/StoreContext'
import { useContext } from 'react'
import './MessageContainer.css'
import Message from '../Message/Message'

const MessageContainer = () => {
    const { messageChain } = useContext(StoreContext);
  return (
    <div className="outside-div">
      <div className='message-container'>
        {
            messageChain.length===1?
            <div className="empty-chat-container"><h5 className='start-chat'>Enter message to start a chat</h5></div>:
            messageChain.map((message)=><Message key={message.index} role={message.role} content={message.content} />)
        }
    </div>
    </div>
  )
}

export default MessageContainer