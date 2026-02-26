import express from "express";
import cors from "cors";
import env from "dotenv";
import pg from "pg";
import bcrypt from "bcrypt";

env.config();
const app=express();
const PORT = 8000 //process.env.port || 8000;

const db = new pg.Client({
    user:process.env.user,
    host:process.env.host,
    database:process.env.database,
    password:process.env.password,
    port:process.env.port
});

db.connect();

app.use(cors({
    origin: [
      "http://localhost:5173",
      "https://news-zeta-blush.vercel.app"
    ],
    methods: ["GET", "POST"]
}));
app.use(express.json());

app.post("/news/fetch", async(req , res)=>{
    const keyword = req.body.message;
    const category = req.body.category;
    const country = req.body.country;
    const language = req.body.language;

    let url = "https://newsapi.org/v2/top-headlines?"

    if(keyword){
        url+=`q=${keyword}&`
    }else if(country || category){
        if(country) {url+=`country=${country}&`}
        if(category){ url+=`category=${category}&`}
    }

    if(language){
        url+=`language=${language}&`
    }

    url+=`apiKey=${process.env.api_key}`

    console.log(url);

    const result = await fetch(url);
    const specific_news_fetch = await result.json();
    
    const required_specific_data = [];

    for(let i=0 ; i<specific_news_fetch.articles.length ; i++){

        const split = specific_news_fetch.articles[i].publishedAt.split("T")[0];
            const time = new Date(split)
            const customTime = time.toLocaleDateString("en-Gb",{
                day:"numeric",
                month:"short",
                year:"numeric"
            });

        if(specific_news_fetch.articles[i].urlToImage){

            const cleaned_specific_data = {
                author:specific_news_fetch.articles[i].author,
                description:specific_news_fetch.articles[i].description,
                publishedAt:customTime,
                title:specific_news_fetch.articles[i].title,
                source:specific_news_fetch.articles[i].source.name,
                image:specific_news_fetch.articles[i].urlToImage,
                url:specific_news_fetch.articles[i].url
            };
    
            required_specific_data.push(cleaned_specific_data);

        }else{
            continue
        };

    }
    console.log(required_specific_data)
    res.json({data : required_specific_data});
});

app.get("/front_page/headlines" , async(req , res)=>{

    const frontPageFetch = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.api_key}`);
    const front_page_fetch_converted  = await frontPageFetch.json();
   
    const required_front_page_data = [];

    for(let i=0 ; i<front_page_fetch_converted.articles.length ; i++){

        if(front_page_fetch_converted.articles[i].urlToImage){

            const split = front_page_fetch_converted.articles[i].publishedAt.split("T")[0];
            const time = new Date(split)
            const customTime = time.toLocaleDateString("en-Gb",{
                day:"numeric",
                month:"short",
                year:"numeric"
            });
            
            const cleaned_front_page_data = {
                author:front_page_fetch_converted.articles[i].author,
                description:front_page_fetch_converted.articles[i].description,
                publishedAt:customTime,
                title:front_page_fetch_converted.articles[i].title,
                source:front_page_fetch_converted.articles[i].source.name,
                image:front_page_fetch_converted.articles[i].urlToImage,
                url:front_page_fetch_converted.articles[i].url
            };
    
            required_front_page_data.push(cleaned_front_page_data);
        }else{
            continue;
        };
    }

    res.json({data : required_front_page_data});

})

app.post("/signUp", async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    try{
        const check_user = await db.query("select * from Auth where email = $1",[username])
        if(check_user.rows.length>0){
            console.log("user exist");
            res.json({status:"User Already Exists"})
        }else{
            try{
                const hash = await bcrypt.hash(password,12);
                console.log(hash);

                const new_user = await db.query("insert into Auth values($1,$2) RETURNING *",[username , hash]);
                res.json({status:"Sign Up Successfull"})
            }catch(err){
                console.log("Error while pushing new user in DB " , err);
            }
            
        }
    }catch(err){
        console.log("Error" , err)
    }

    res.json({message:"received"})
});



app.listen(PORT, ()=>{
    console.log(`Server running on port 8000`);
});