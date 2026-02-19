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

    console.log(front_page_fetch_converted)

    const required_front_page_data = [];

    for(let i=0 ; i<front_page_fetch_converted.articles.length ; i++){

        const cleaned_front_page_data = {
            author:front_page_fetch_converted.articles[i].author,
            description:front_page_fetch_converted.articles[i].description,
            publishedAt:front_page_fetch_converted.articles[i].publishedAt,
            title:front_page_fetch_converted.articles[i].title,
            //source:front_page_fetch_converted.articles[i].source.name,
            image:front_page_fetch_converted.articles[i].urlToImage,
            url:front_page_fetch_converted.articles[i].url
        }

        required_front_page_data.push(cleaned_front_page_data);

    }

    res.json({data : required_front_page_data});

})
app.listen(8000, ()=>{
    console.log(`Server running on port 8000`);
});