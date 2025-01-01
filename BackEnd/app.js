const {admin} = require('./firebase-admin')
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
    // const userList = await admin.auth().listUsers()
    // console.log(userList);
    res.send({
        message : 'backend is running'
    })
})

app.post('/checkAdmin', async( req, res) => {
    const {uid, email} =  req.body 
    
    console.log(uid);
    try{
        // This gets all the users existing users
        const userList = await admin.auth().listUsers()

        // This checks whether there is some admin already?
        const adminAlreadyExists = userList.users.some( user =>{
            return user.customClaims?.role === "Admin"
        })

        // If there is no such admin user, make the current one as admin
        if(!adminAlreadyExists){
            await admin.auth().setCustomUserClaims(uid, { role : 'Admin'})
            console.log(`User with uid : ${uid} is now Admin `);
            res.status(200).send( { isAdmin : true } )

        }else{
            await admin.auth().setCustomUserClaims(uid, {role : "Guest"})
            console.log(`User with uid : ${uid} is now a guest `);
            res.status(200).send({ isAdmin: false})
        }
    }
    catch( err){
        console.log(' Unable to check user role ', err);
        return res.send({ message : "Unable to check user role "})
    }
})

app.post('/getAllUserRoles', async (req, res) => {
    const {uid} = req.body

    const userList = admin.auth().listUsers()
    

})

app.listen(port, () =>{
    console.log('Server running on port : 5000');
})
