import React from 'react'
import StoreContextProvider from './context/StoreContext'
import Header from '@/components/Header/Header'
import InputField from '@/components/InputField/InputField'
import MessageContainer from '@/components/MessageContainer/MessageContainer'
const page = () => {
  
  return (
    <StoreContextProvider>
      <div className='page'>
        <Header/>
        <MessageContainer/>
        <InputField/>
      </div>
    </StoreContextProvider>
    
  )
}

export default page