import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = 8000;

app.use(express.json());

app.use(cors({
  origin:[
    "http://localhost:5173",
    "https://news-zeta-blush.vercel.app"
  ],
  methods:["GET","POST"]
}));

const db = new pg.Client({
  connectionString:process.env.externalDB,
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect();

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS
  }
});


const otpStore = {};

async function sendOtp(email,otp){

  const mailOptions = {
    from:process.env.EMAIL_USER,
    to:email,
    subject:"Your OTP For The Public Brief",
    text:`Your OTP is ${otp}. It will expire in 5 minutes`
  };

  await transporter.sendMail(mailOptions);

}


app.post("/news/fetch",async(req,res)=>{

  const keyword = req.body.message;
  const category = req.body.category;
  const country = req.body.country;
  const language = req.body.language;

  let url = "https://newsapi.org/v2/top-headlines?";

  if(keyword){
    url += `q=${keyword}&`;
  }
  else if(country || category){

    if(country) url += `country=${country}&`;
    if(category) url += `category=${category}&`;

  }

  if(language){
    url += `language=${language}&`;
  }

  url += `apiKey=${process.env.API_KEY}`;

  try{

    const result = await fetch(url);
    const data = await result.json();

    const requiredData = [];

    for(let i=0;i<data.articles.length;i++){

      if(!data.articles[i].urlToImage) continue;

      const split = data.articles[i].publishedAt.split("T")[0];
      const time = new Date(split);

      const customTime = time.toLocaleDateString("en-GB",{
        day:"numeric",
        month:"short",
        year:"numeric"
      });

      requiredData.push({
        author:data.articles[i].author,
        description:data.articles[i].description,
        publishedAt:customTime,
        title:data.articles[i].title,
        source:data.articles[i].source.name,
        image:data.articles[i].urlToImage,
        url:data.articles[i].url
      });

    }

    res.json({data:requiredData});

  }catch(err){

    console.log(err);
    res.status(500).json({error:"News fetch failed"});

  }

});


app.get("/front_page/headlines",async(req,res)=>{

  try{

    const frontPageFetch = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.API_KEY}`
    );

    const data = await frontPageFetch.json();

    const requiredData = [];

    for(let i=0;i<data.articles.length;i++){

      if(!data.articles[i].urlToImage) continue;

      const split = data.articles[i].publishedAt.split("T")[0];
      const time = new Date(split);

      const customTime = time.toLocaleDateString("en-GB",{
        day:"numeric",
        month:"short",
        year:"numeric"
      });

      requiredData.push({
        author:data.articles[i].author,
        description:data.articles[i].description,
        publishedAt:customTime,
        title:data.articles[i].title,
        source:data.articles[i].source.name,
        image:data.articles[i].urlToImage,
        url:data.articles[i].url
      });

    }

    res.json({data:requiredData});

  }catch(err){

    console.log(err);
    res.status(500).json({error:"Front page fetch failed"});

  }

});

let current_user = '';

app.post("/request-otp",async(req,res)=>{

  try{

    const {email,password} = req.body;
    console.log("OTP request received:",email);

    const checkUser = await db.query(
      "SELECT * FROM Auth WHERE email=$1",
      [email]
    );

    console.log("User check passed");

    const otp = Math.floor((Math.random()*9000)+1000);

    const hash = await bcrypt.hash(password,12);

    otpStore[email] = { otp, password:hash, expires:Date.now()+300000 };

    console.log("Sending email...");

    await sendOtp(email,otp);

    console.log("Email sent");

    res.json({status:"OTP Sent"});

  }catch(err){
    console.log("OTP ERROR:",err);
    res.status(500).json({status:"Server Error"});
  }
});


app.post("/verify-otp",async(req,res)=>{

  const {email,otp} = req.body;

  const stored = otpStore[email];

  if(!stored){
    return res.json({status:"OTP Not Requested"});
  }

  if(Date.now()>stored.expires){

    delete otpStore[email];
    return res.json({status:"OTP Expired"});

  }

  if(parseInt(otp)!==stored.otp){
    return res.json({status:"Invalid OTP"});
  }

  try{

    await db.query(
      "INSERT INTO Auth VALUES($1,$2)",
      [email,stored.password]
    );

    delete otpStore[email];

    current_user = email;
    res.json({status:"Successfully Authenticated"});

  }catch(err){

    console.log(err);
    res.status(500).json({status:"Server Error"});

  }

});


app.post("/login",async(req,res)=>{

  const {username,password} = req.body;

  try{

    const checkUser = await db.query(
      "SELECT password FROM Auth WHERE email=$1",
      [username]
    );

    if(checkUser.rows.length===0){
      return res.json({status:"User Doesn't Exist"});
    }

    const match = await bcrypt.compare(
      password,
      checkUser.rows[0].password
    );

    if(match){
      current_user = username;
      res.json({status:"Successfully Authenticated"});
    }
    else{
      res.json({status:"Wrong Password"});
    }

  }catch(err){

    console.log(err);
    res.status(500).json({status:"Server Error"});
  }

});

let keywords = [];

app.post("/custom/fetch" , async(req , res)=>{
  const keyword = req.body.message;

  if (keywords.length<4){
    keywords.push(keyword);
  }else{
    keywords.shift()
    keywords.push(keyword)
  }

  try{
    const result = await db.query("update Auth set searches = $1 where email = $2 RETURNING *",[keywords.join(" AND ") , current_user]);
    let searches = result.rows[0].searches;

    //console.log(`https://newsapi.org/v2/everything?q=${searches}&apiKey=${process.env.API_KEY}`);
    const customPage = await fetch(`https://newsapi.org/v2/everything?q=${searches}&apiKey=${process.env.API_KEY}`)

    const data = await customPage.json();

    const requiredData = [];

    for(let i=0;i<data.articles.length;i++){

      if(!data.articles[i].urlToImage) continue;

      const split = data.articles[i].publishedAt.split("T")[0];
      const time = new Date(split);

      const customTime = time.toLocaleDateString("en-GB",{
        day:"numeric",
        month:"short",
        year:"numeric"
      });

      requiredData.push({
        author:data.articles[i].author,
        description:data.articles[i].description,
        publishedAt:customTime,
        title:data.articles[i].title,
        source:data.articles[i].source.name,
        image:data.articles[i].urlToImage,
        url:data.articles[i].url
      });

    }

    res.json({data:requiredData});

  }catch(err){
    console.log("Custom page Error " , err);
  }
})

app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`);
});