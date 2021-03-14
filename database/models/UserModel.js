const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    login: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    permission: {
        type: String,
        default: 'normal'
    },
    lastVoted: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('User', UserSchema);