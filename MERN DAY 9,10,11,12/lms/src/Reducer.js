import React, { useReducer } from 'react'

const initial = {
  users: {},
  products: { home: { id: null } }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USER': {
      let n_u = action.payload
      return {}
    }
    default:
      return state
  }
}

function Reducer() {
  const [state, dispatch] = useReducer(reducer, initial)
  const fetching = () => {
    let d = axios.get(api)
    dispatch({ type: 'ADD', payload: d })
  }
  const remove = (item) => {
    dispatch({ type: 'REMOVE', payload: item })
  }
  return (
    <div>Reducer</div>
  )
}

export default Reducer