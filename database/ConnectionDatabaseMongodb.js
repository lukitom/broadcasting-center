const mongoose = require('mongoose');


var uri = "mongodb_connection_string";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

module.exports = mongoose.connection;