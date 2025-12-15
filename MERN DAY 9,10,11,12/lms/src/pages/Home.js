import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Home({u_id}) {
    let dispatch=useDispatch()
    const{items,users}=useSelector(state=>state)
    const order=(id)=>{
        let o_i=items.filter(i=>i.id==id)
        let order_item=o_i[0]
        dispatch({type:"ORDER_ITEM",payload:{id:u_id,item:order_item}})
        console.log(users)
        // let u=users.filter(u=>u.id==u_id)
        
        // console.log(u[0],"user details")

    }
  return (
    <div>
        <Link to={'/additem'}>Add Item</Link>
        {items.map(i=>(
            <li key={i.id} style={{width:"40px",height:"40px",background:"lightblue"}}>
            <div >name:{i.name}</div>
            <div>price:{i.price}</div>
            <button onClick={()=>order(i.id)}>order</button>
            </li>   
        ))}
    </div>
  )
}

export default Home