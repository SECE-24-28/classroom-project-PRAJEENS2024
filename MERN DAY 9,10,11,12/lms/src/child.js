import React, { useContext } from 'react'
import { ContextData } from './context'

function child() {
  let{state,add} = useContext(ContextData)
  console.log(state)
  return (
    <button onClick={()=>{"something"}}>add</button>
  )
}

export default child