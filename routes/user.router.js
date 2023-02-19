const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const {userModel} = require("../models/users")


userRouter.get("/",(req,res)=>{
    res.send("data");
})

userRouter.post("/register",async (req,res)=>{
    const {name,email,pass} = req.body;
    try{
        bcrypt.hash(pass,5, async (err,hash) =>{
            if(err){
                res.send({"msg":err.message})
            }else{
                const data = new userModel({name,email,pass:hash});
                await data.save();
                res.send({"msg":"data is saved"})
            }
        })
    }catch(err){
        res.send({"msg":err.message});
    }

})


userRouter.post("/login", async (req, res) => {
    const { email, pass } = (req.body);
    try {
        const user = await userModel.find({ email });
        if (user.length > 0) {
            bcrypt.compare(pass, user[0].pass, (err, result) => {
                if (result) {
                    let token = jwt.sign({ userId: user[0]._id }, "masai", { expiresIn: "3600s" })
                    res.send({ "msg": "Logged In ", "token": token });
                } else {
                    res.send({ "msg": "Wrong credentials" });
                }
            });

        } else {
            res.send({ "msg": "Wrong credentials" });
        }
    } catch (error) {
        res.send({ "msg": "New user Unable to  Logged In", "error": error.message });
    }


})


module.exports = {
    userRouter
}