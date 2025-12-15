import React, { createContext } from 'react'
import Reducer from './Reducer'
export const ContextData=createContext()
function Context({children}) {
    let {state,add,remove}= Reducer()
  return (
    <div>
      <ContextData.Provider value={{state,add,remove}}>
        {children}
      </ContextData.Provider>  
    </div>
  )
}

export default Context  