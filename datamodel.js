const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)

const userSchema=mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: Date
})

module.exports=mongoose.model("user",userSchema);