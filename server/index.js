import express from "express";
import cors from "cors";
const app=express();

app.use(cors());
app.use(express.json());

app.get("/", (req , res)=>{
    res.send(JSON.stringify("Hello"))
})

app.listen(8000, ()=>{
    console.log(`Server running on port 8000`);
})