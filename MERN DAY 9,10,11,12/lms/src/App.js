// import React, { useReducer } from 'react'

// let initialstate = 0

// const INC_DC = (state, action) => {
//   switch (action) {
//     case 'increment':
//       return state + 1
//     case 'decrement':
//       return state - 1
//     case 'reset':
//       return initialstate
//     default:
//       return state
//   }
// }

// function App() {
//   const [state, dispatch] = useReducer(INC_DC, initialstate)

//   return (
//     <div>
//       {state}
//       <button onClick={() => dispatch('increment')}>increment</button>
//       <button onClick={() => dispatch('decre
// ment')}>decrement</button>
//       <button onClick={() => dispatch('reset')}>reset</button>
//     </div>
//   )
// }

// export default App
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "./Redux/Actions";

function App() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);

  return (
    <div>
      <h2> {count}</h2>

      <button onClick={() => dispatch(increment())}>
        Increment
      </button>

      <button onClick={() => dispatch(decrement())}>
        Decrement
      </button>
    </div>
  );
}

export default App;
