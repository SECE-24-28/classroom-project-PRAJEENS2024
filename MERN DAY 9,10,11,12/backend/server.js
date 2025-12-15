import express, { response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
//const express = require('express') - common.js
let app = express()
app.use(express.json())
app.use(cors())
let users = [{}]
mongoose.connect('mongodb+srv://dummy:dummy@cluster0.1dsjswm.mongodb.net/demo?appName=Cluster0')
.then(()=>{
    console.log("connection success") // dummy
})
.catch(()=>{
    console.log("Catched")
})
app.get('/users',(req,res)=>{
    res.send("hello1")
})
app.post('/users',(req,res)=>{
    let n_user = req.body
    users.push(n_user)
    res.send("user added successfully")
})

app.put('/users/:id',(req,res)=>{
    let i = req.params.id
    res.send("user putted successfully")
})

app.delete('/users/:id',(req,res)=>{
    let j = req.params.id
    res.send("Deleted successfully")
})
app.listen(5000,()=>{
    console.log("server running on 5000")
})
