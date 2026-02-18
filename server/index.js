import express from "express";
import cors from "cors";
import env from "dotenv";

env.config();
const app=express();

app.use(cors());
app.use(express.json());

app.post("/news/fetch", async(req , res)=>{
    console.log(req.body.message);
    res.json({message:"received"})
});

app.listen(8000, ()=>{
    console.log(`Server running on port 8000`);
});