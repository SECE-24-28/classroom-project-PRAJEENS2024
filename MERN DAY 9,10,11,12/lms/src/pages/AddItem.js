import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

function AddItem() {
    let dispatch=useDispatch()
    const [form,setForm]=useState({
        name:"",
        price:""
    })
    const submit=(e)=>{
        e.preventDefault()
        dispatch({type:"ADD_ITEM",payload:form})
    }
  return (
    <div>
        <Link to={'/'}>Home</Link>
        <form onSubmit={submit}>
            <input value={form.name} onChange={(e)=>{
                let n={name:e.target.value}
                setForm(prev=>{ 
                   return {...prev,...n}})}}
                    />
            <input
            value={form.price} onChange={(e)=>{
                let n={price:e.target.value}
                setForm(prev=>{ 
                   return {...prev,...n}})}}
            />
            <input type="submit"/>
        </form>
    </div>
  )
}

export default AddItem