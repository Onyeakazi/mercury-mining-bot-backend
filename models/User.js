const mongoose = require("mongoose");

const userScheme = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    
    password: {
        type: String,
        required: true,
    },

    walletAddress: {
        type: String,
        required: true,
    },
    
    role: {
        type: String,
        default: 'user',
    },

}, { timestamps: true });

exports.User = mongoose.model("User", userScheme);