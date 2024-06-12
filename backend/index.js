const express = require("express");
const { User } = require("./db");
const app = express(); 
const { JWT_Pass } = require("./config"); 
const jwt = require("jsonwebtoken")
const rootRouter = require("./routes/index");
const userRouter = require("./routes/user");
const cors = require('cors'); 

app.use(cors()); 
app.use(express.json()); 

app.use("/api/v1", rootRouter); 

app.listen(3000, ()=>{
    console.log("App started at port number 3000"); 
})