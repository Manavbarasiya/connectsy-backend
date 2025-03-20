
const validate=require("validator");
const validateData=(req)=>{
    const {firstName,lastName,emailId,password}=req.body;
    if(!firstName || !lastName){
        throw new Error("FirstName/LastName missing");
    }else if(!validate.isEmail(emailId)){
        throw new Error("Please enter valid email");
    }else if(!validate.isStrongPassword(password)){
        throw new Error("Please enter strong password");
    }
}
module.exports={
    validateData
}