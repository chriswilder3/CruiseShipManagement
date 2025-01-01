const {admin} = require('./firebase-admin')
const express = require('express')
const bodyparser = require('body-parser')
const cors  = require('cors')

const port = 5000

const app = express()

app.use( cors(
    { 
          
    }
))

// app.use( bodyparser.urlencoded({ extended : true}))
// Used for accepting form data

app.use(bodyparser.json())

app.get('/', async (req, res) =>{
    // const userList = await admin.auth().listUsers()
    // console.log(userList);
    res.send({
        message : 'backend is running'
    })
})

// This is a request by signup page to check if the current user is 
// an admin or not.

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

app.post('/getAllGuests', async (req, res) => {
    const {uid} = req.body
    console.log(uid);
    try{
        const submitterData = await admin.auth().getUser(uid)
        if(submitterData.customClaims.role === "Admin"){
           await admin.auth().listUsers()
           .then( (userList) => {
                res.status(200).send({'guestDetails':userList.users.filter(user =>user.customClaims && user.customClaims.role === "Guest").map( user => ({id: user.uid,email : user.email }))})
           })
           .catch((err)=> console.error(err))
        }
        else{
            res.status(402).send({"err":"You dont have the permission to do this"})
        }
    }
    catch(err){
        res.status(404).send({"err":err})
    }
})

app.post("/approveUser", async (req, res) => {
    const { role, uid } = req.body

    console.log(role, uid);

    admin.auth().setCustomUserClaims(uid,{
        role : role
    })
    .then( () => {
        res.status(200).send({"msg":"success"})
    })
    .catch( (err) => res.status(400).send({"msg":err}) )
    
})


app.listen(port, () =>{
    console.log('Server running on port : 5000');
})

// app.post('/getAllUserRoles', async (req, res) => {
//     const {uid} = req.body
//     console.log( admin.auth().getUser(uid));
  
//     const userList = admin.auth().listUsers()
//     print(userList)
//     res.status(200).send('Admin ')

// })


