const mongoose = require('mongoose');

const user = process.env.MONGODB_USER
const pass = process.env.MONGODB_PASS

const uri2 = "mongodb+srv://" + user + ":" + pass + "@cluster0.sugax.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri2, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => { console.log("MongoDb connected ...")})
    .catch((err) => { console.log(`${err}`)});

module.exports = mongoose.connection;