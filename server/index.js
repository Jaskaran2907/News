import express from "express";
import cors from "cors";
import env from "dotenv";

env.config();
const app=express();

app.use(cors());
app.use(express.json());

app.post("/news/fetch", async(req , res)=>{
    const keyword = req.body.message;
    const specific_news_fetch = await fetch(`https://newsapi.org/v2/top-headlines?q=${keyword}&apiKey=${process.env.api_key}`)
});

app.get("/front_page/headlines" , async(req , res)=>{
    const frontPageFetch = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.api_key}`);
    const front_page_fetch_converted  = await frontPageFetch.json();
    res.json({data : front_page_fetch_converted});
})
app.listen(8000, ()=>{
    console.log(`Server running on port 8000`);
});