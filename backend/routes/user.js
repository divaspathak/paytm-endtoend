const express = require("express");
const userRouter = express.Router();
const zod = require("zod");
const JWT_Pass = require("../config");
const jwt = require('jsonwebtoken'); 
const { authMiddleware } = require("../middleware");
const { User, Account } = require("../db");

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string(),
});

userRouter.post("/signup", (req, res) => {
    const body = req.body;
    const username = req.body.username;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    const success = signupSchema.safeParse(req.body);
    if (!success) {
        res.json({
            message: "Email already taken / Incorrect inputs",
        });
    } else {
        User.findOne({
            username: username,
        }).then((response) => {
            if (response) {
                console.log(response);
                res.send("User already present, please signin");
            } else {
                User.create({
                    username: username,
                    password: password,
                    firstname: firstname,
                    lastname: lastname,
                }).then((response) =>{
                        req.body.id = response._id
                        Account.create({
                            userId : response._id, 
                            balance: 1 + Math.random() * 10000
                        })
                    }
                )
                .then((user) => {
                    console.log(user); 
                    const token = jwt.sign(
                        {
                            userId: req.body.id,
                        },
                        JWT_Pass
                    );
                    res.json({
                        message: "User Created Successfully", 
                        token: token
                    })
                });
            }
        });
    }
});

userRouter.post("/signin", (req, res)=>{
    const username = req.body.username 
    const password = req.body.password

    User.findOne({
        username: username, 
        password: password
    }).then((response)=>{
        if(response){
            const userId = response._id;
            const token = jwt.sign({userId}, JWT_Pass); 
            res.json({
                token: token
            })
        }else{
            res.send("Couldn't find the user")
        }
    })
})

const updateBody = zod.object({
    password: zod.string().optional(), 
    firstname : zod.string().optional(), 
    lastname: zod.string().optional()
})

userRouter.put("/", authMiddleware ,(req, res)=>{
    const body = updateBody.safeParse(req.body);  

    User.updateOne({
        _id : req.id
    }, req.body).then((response)=>{
        if(response){
            res.json({
                message: "Details Updated Successfully"
            })
        }
        else{
            res.send("Failed to update the details")
        }
    })
})

userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = userRouter;
