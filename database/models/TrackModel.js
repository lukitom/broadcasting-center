const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrackModel = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    artist: {
        type: Array
    },
    _id: {
        type: String,
        unique: true,
        required: true
    },
    prewiewURL: {
        type: String
    },
    uri: {
        type: String
    }
});

module.exports = mongoose.model('Track', TrackModel);