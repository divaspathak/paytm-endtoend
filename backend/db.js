const mongoose = require("mongoose");
const { number } = require("zod");
mongoose.connect("mongodb+srv://divaspathak:Divas5563**@cluster0.2n3lmsk.mongodb.net/Paytm?retryWrites=true&w=majority")

const userSchema = new mongoose.Schema({
    username : String, 
    password : String,
    firstname : String, 
    lastname : String, 
})

const User = mongoose.model("User", userSchema); 

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref : 'User', 
        required: true
    }, 
    balance : {
        type : Number, 
        required : true, 
    }
})

const Account = mongoose.model('Account', accountSchema); 

module.exports = {
    User, 
    Account
}

