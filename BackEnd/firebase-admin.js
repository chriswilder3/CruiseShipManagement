const admin = require('firebase-admin')

const serviceAccount = require('./keys/celestia-cruiseship-management-firebase-adminsdk-9q602-612e710736.json')

admin.initializeApp(
    {
        credential : admin.credential.cert(serviceAccount),
    }
)

const db = admin.firestore()
const auth = admin.auth()


