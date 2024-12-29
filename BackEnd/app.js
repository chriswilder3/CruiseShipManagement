// const admin = require('firebase-admin')
const express = require('express')
const bodyparser = require('body-parser')
const cors  = require('cors')

const port = 5000

const app = express()

app.use( cors(
    { 
        origin : 'http://localhost:5173',   
    }
))

app.use( bodyparser.urlencoded({ extended : true}))
// Used for accepting form data

app.use(bodyparser.json())

app.get('/', async (req, res) =>{
    
       
    res.send({
        message : 'backend is running'
        
    })
})

app.post('/', async( req, res) => {
    const {email,pass} =  req.body 
    if(email === 'sachin@g.com' && pass === 'b')
    {
        res.status(200).json( { message : 'Login Successful', 'user-details': {email, pass}})
    }
    else{
        res.status(400).json( {message : 'Wrong email or password'})
    }
})

app.listen(port, () =>{
    console.log('Server running on port : 5000');
})
