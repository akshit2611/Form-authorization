const express=require("express");
const app=express();
require("dotenv").config();
const port = process.env.PORT || 4000;
const mongo=require("mongoose");
const path=require("path")
const datamodel=require("./datamodel");
const bcrypt=require("bcrypt");
const ejs=require("ejs");
const jwt=require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { log } = require("console");

app.set("view engine","ejs")
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")))

app.get("/",(req,res)=>{
    res.render("index")
});

app.post("/create",(req,res)=>{
    let { name, email, password, age } = req.body;
    if (!name || !email || !password || !age) {
        return res.status(400).send("All fields are required");
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.status(500).send("Error generating salt");
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) return res.status(500).send("Error hashing password");
            try {
                let createduser = await datamodel.create({
                    name,
                    email,
                    password: hash,
                    age,
                    createdAt: new Date()
                });
                let token = jwt.sign({ email }, process.env.JWT_SECRET);
                res.cookie("token", token);
                // Fetch all users and render users.ejs
                let users = await datamodel.find();
                res.render("users", { users });
            } catch (e) {
                return res.status(500).send("Error creating user");
            }
        });
    });
});

app.get("/update",async(req,res)=>{
    let updateduser=await datamodel.findOneAndUpdate({name:"Hitesh"},{name:"Hitesh Sharma"},{new:true})
    res.send(updateduser);
});


app.get("/users", async (req, res) => {
    try {
        let users = await datamodel.find();
        res.render("users", { users });
    } catch (e) {
        res.status(500).send("Error fetching users");
    }
});

app.get("/delete",async(req,res)=>{
    let deleteduser=await datamodel.findOneAndDelete({});
    res.send(deleteduser);
})

app.get("/login",(req,res)=>{
res.render("login");
})

app.post("/login", async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send("Email and password are required");
    }
    try {
        let user = await datamodel.findOne({ email });
        if (!user) {
            return res.status(404).send("User not found, Please sign up first!!");
        }
        bcrypt.compare(password, user.password, async (err, isMatch) => {
            if (err) return res.status(500).send("Error comparing passwords");
            if (!isMatch) return res.status(401).send("Invalid password");
            // Update lastLogin
            await datamodel.findByIdAndUpdate(user._id, { lastLogin: new Date() });
            res.send("Login successfull");
        });
    } catch (e) {
        res.status(500).send("Error logging in");
    }
})


app.listen(port,()=>{
console.log("working")
})