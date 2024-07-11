'use client'
import React from 'react'
import { useState } from 'react'
import { useContext, useEffect } from 'react'
import { StoreContext } from '@/app/context/StoreContext'
import './InputField.css'
var apiKey = process.env.NEXT_PUBLIC_FIREWORK_API_KEY
let messageChain1 = [{"role":"system", "content":"You are a helpful assistant. Answer with negative feedback if the questions are not related."}]

const InputField = () => {
    const [message, setMessage] = useState('');
    var isDisabled = message===''
    // message===''?setIsDisabled(true):setIsDisabled(false)
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
  const buildOption = ()=>{
    console.log(apiKey)
    if(messageChain1.length>10){
      messageChain1.slice(0,-9);
      messageChain1 = [{"role":"system", "content":"You are a helpful assistant. Answer with negative feedback if the questions are not related."}, ...messageChain1];
    }

    var bodyObject = {
      model: "accounts/fireworks/models/llama-v3-70b-instruct",
      // messages: messageChain,
      // messages: [{"role":"user","content":"Hello"}],
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
    // console.log(messageChain)
    return options;
  }
  
   async function  submitMessage(){
      index+=1;
      addMessageToChain(index, "user", message);
      messageChain1.push({"role": "user", "content": message})
      const options = buildOption();
      await fetch('https://api.fireworks.ai/inference/v1/chat/completions', options)
          .then(response => response.json())
          // .then(response => console.log(response))
          .then(response => replyMessage = response.choices[0].message.content)
          // .then(addMessageToChain("assistant", replyMessage))
          // .then(console.log(messageChain1))
          // .then(console.log(messageChain))
          .catch(err => console.error(err))
      setMessage('')
      index+=1; 
      addMessageToChain(index, "assistant", replyMessage);
      messageChain1.push({"role": "assistant", "content": replyMessage})
    }
    console.log()
    // console.log(messageChain1)
//   const submitMessage = ()=>{
//     return(
//       fetch('https://api.fireworks.ai/inference/v1/chat/completions', options)
//         .then(response => response.json())
//         // .then(response => console.log(response))
//         .then(response =>setReplyMessage(response.choices[0].message.content))
//         .then(addMessageToChain("assistant", replyMessage))
//         .catch(err => console.error(err))
//     )
//   }
  const handleChange = (e) => setMessage(e.target.value)
  return (
    <div className='input-div'>
      <div className='sub-div'>
        <input placeholder='Enter your message here' className='input-field' value={message} onChange={handleChange} type="text"/>
        <button className='button' disabled={isDisabled} onClick={()=>submitMessage()}>
          <p className='button-text'>Send Message</p>
          <p className='button-text-small'>Send</p>
        </button>
      </div>
    </div>
  )
}

export default InputField