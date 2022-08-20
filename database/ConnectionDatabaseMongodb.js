const mongoose = require('mongoose');

const user = process.env.MONGODB_USER
const pass = process.env.MONGODB_PASS
const host = process.env.MONGODB_HOST
const dbName = process.env.MONGODB_NAME

const uri2 = `mongodb://${user}:${pass}@${host}/${dbName}`;

mongoose.connect(uri2)
    .then(() => { console.log("MongoDb connected ...")})
    .catch((err) => { console.log(`${err}`)});

module.exports = mongoose.connection;
