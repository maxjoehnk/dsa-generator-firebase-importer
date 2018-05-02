const admin = require('firebase-admin');
const dsa5 = require('./dsa5');

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://dsa-generator.firebaseio.com'
});

dsa5.setup('../datasets/dsa5');