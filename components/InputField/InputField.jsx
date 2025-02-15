'use client'
import React from 'react'
import { useState } from 'react'
import { useContext, useEffect, useRef } from 'react'
import { StoreContext } from '@/app/context/StoreContext'
import './InputField.css'
var apiKey = process.env.NEXT_PUBLIC_FIREWORK_API_KEY
let messageChain1 = [{"role":"system", "content":"You are a helpful assistant. Answer with negative feedback if the questions are not related."}]

const InputField = () => {
    const [message, setMessage] = useState('');
    var isDisabled = message==='';
    const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  var index = 0;
  var replyMessage = ''
  const {addMessageToChain, newChat, setNewChat, setMessageChain} = useContext(StoreContext)
  useEffect(() => {
    if (newChat) {
      messageChain1 = [{"role":"system", "content":"You are a helpful assistant. Answer with negative feedback if the questions are not related."}]
      setMessageChain([{"index": 0,"role":"system", "content":"You are a helpful assistant."}]);
      setNewChat(false);
    }
  }, [newChat, setMessageChain, setNewChat]);
  useEffect(() => {
    inputRef.current.focus();
  }, [isLoading]);
  const buildOption = ()=>{
    if(messageChain1.length>10){
      messageChain1.slice(-9);
      messageChain1 = [{"role":"system", "content":"You are a helpful assistant. Answer with negative feedback if the questions are not related."}, ...messageChain1];
    }

    var bodyObject = {
      model: "accounts/fireworks/models/llama-v3-70b-instruct",
      messages: messageChain1,
      max_tokens: 50,
      temperature: 0.6
    };
    
      var options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyObject)
    }
    return options;
  }
  const checkEnter = (e)=>{
    if(message!=='' && e.key==="Enter"){
      setIsLoading(true)
      submitMessage();
    }
  }
  
   async function  submitMessage(){
      index+=1;
      addMessageToChain(index, "user", message);
      messageChain1.push({"role": "user", "content": message})
      setMessage('')
      const options = buildOption();
      await fetch('https://api.fireworks.ai/inference/v1/chat/completions', options)
          .then(response => response.json())
          .then(response => replyMessage = response.choices[0].message.content)
          .catch(err => console.error(err))
      
      index+=1; 
      addMessageToChain(index, "assistant", replyMessage);
      messageChain1.push({"role": "assistant", "content": replyMessage})
      setIsLoading(false);
      inputRef.current.focus();
    }
    
  const handleChange = (e) => setMessage(e.target.value)
  return (
    <div className='input-div'>
      <div className='sub-div'>
        <input placeholder='Enter your message here' 
          disabled={isLoading} 
          className='input-field' value={message} 
          onChange={handleChange} 
          onKeyDown={checkEnter} 
          type="text"
          ref={inputRef}
        />
        <button className='button' disabled={isDisabled || isLoading} onClick={()=>submitMessage()}>
          <p className='button-text'>Send Message</p>
          <p className='button-text-small'>Send</p>
        </button>
      </div>
    </div>
  )
}

export default InputField