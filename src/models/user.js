const mongoose=require("mongoose");
const validator = require('validator');
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email address not valid");
            }
        },
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
    },
    gender:{
        type:String,
    },
    photoURL:{
        type:String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("URL not valid");
            }
        },
    },
    about:{
        type:String,
        default:"Hello this is default"
    },
    skills:{
        type:[String],
    }
},{
    timestamps:true,
})
module.exports=mongoose.model("User",userSchema);