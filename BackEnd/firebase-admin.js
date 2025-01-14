const admin = require('firebase-admin')
require('dotenv').config()
// const serviceAccount = require('./keys/celestia-cruiseship-management-firebase-adminsdk-9q602-612e710736.json')

const serviceAccount = JSON.parse( process.env.FIREBASE_SERVICE_ACCOUNT )

admin.initializeApp(
    {
        credential : admin.credential.cert(serviceAccount),
    }
)

const db = admin.firestore()
const auth = admin.auth()
// console.log(auth);

module.exports = { db, auth, admin }

