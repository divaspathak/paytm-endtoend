const express = require("express");
const { User } = require("./db");
const app = express(); 
app.use(express.json()); 
const { JWT_Pass } = require("./jwt");
const jwt = require("jsonwebtoken")

app.post("/signup", (req, res)=>{
    const username = req.body.username 
    const password = req.body.password
    const firstname = req.body.firstname
    const lastname = req.body.lastname


    User.findOne({
        username: username, 
        password: password
    }).then((response)=>{
        if(response){
            console.log(response); 
            res.send("User already present, please signin"); 
        }
        else{
            User.create({
                username: username, 
                password: password, 
                firstname: firstname, 
                lastname: lastname
            }).then(()=>{
                res.send("User Created Successfully")
            })
        }
    })
})

app.post("/signin", (req, res)=>{
    const username = req.body.username 
    const password = req.body.password

    User.findOne({
        username: username, 
        password: password
    }).then((response)=>{
        if(response){
            const token = jwt.sign({username : user}, JWT_Pass); 
            res.json({
                token: token
            })
        }else{
            res.send("Couldn't find the user")
        }
    })
})

app.listen(3000, ()=>{
    console.log("Server started at port number 3000"); 
})




