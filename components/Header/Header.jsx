'use client'
import React from 'react'
import './Header.css'
import { useContext } from 'react'
import { StoreContext } from '@/app/context/StoreContext'

const Header = () => {
  const {setNewChat} = useContext(StoreContext)
  const triggerNewChat = ()=>{
    setNewChat(true)
  }
  return (
    <div className='header'>
        <h1>Welcome to Chatbot</h1>
        <button className='new-chat' onClick={()=>triggerNewChat()}>New Chat</button>
    </div>
  )
}

export default Header