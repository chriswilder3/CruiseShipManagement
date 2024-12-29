// const admin = require('firebase-admin')
const express = require('express')
const bodyparser = require('body-parser')
const cors  = require('cors')

const port = 5000

const app = express()



app.use(bodyparser.json())

app.get('/', async (req, res) =>{
    res.send('Backend is running!..')
})

app.listen(port, () =>{
    console.log('Server running on port : 5000');
})
