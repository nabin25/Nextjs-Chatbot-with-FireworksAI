'use client'
import { useState } from "react";
import { createContext } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [messageChain, setMessageChain] = useState([{"index": 0,"role":"system", "content":"You are a helpful assistant."}]);
    const addMessageToChain = async (index, role, message) => {
        setMessageChain(prev => ([...prev, {"index": index, "role":role, "content":message}]))

    }
    const contextValue = {
        messageChain,
        addMessageToChain,
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
