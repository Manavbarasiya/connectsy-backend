const express=require("express");
const app=express();
app.listen(3000,()=>{
    console.log("Secuues");
})
app.use("/test",(req,res)=>{
    res.send("Hello from the server");
})
