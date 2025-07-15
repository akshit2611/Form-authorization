const mongoose=require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/mongopractise`)

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