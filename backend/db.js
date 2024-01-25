const { mongoose } = require("mongoose");
mongoose.connect("mongodb+srv://divaspathak:<Password>@cluster0.2n3lmsk.mongodb.net/Paytm?retryWrites=true&w=majority")

const userSchema = new mongoose.Schema({
    username : String, 
    password : String,
    firstname : String, 
    lastname : String, 
})

const User = mongoose.model("User", userSchema); 

module.exports = {
    User, 
}
