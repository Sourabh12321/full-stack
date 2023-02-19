const express = require("express");
const {connection} = require("./db");
const {userRouter} = require("./routes/user.router")
const {notesRouter} = require("./routes/notes.router");
const {authenticate} = require("./middleware/authenticate");
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cors());


app.get("/",(req,res)=>{
    res.send("home page")
})

app.use("/user",userRouter);
app.use(authenticate);
app.use("/note",notesRouter);

app.listen(process.env.port,async ()=>{
    try{
        await connection
        console.log("start working");

    }catch(err){
        console.log(err.message);

    }
    
})