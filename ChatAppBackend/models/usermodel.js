const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        default: "anonymous"
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
    }
})

module.exports = new mongoose.model('User', userSchema);