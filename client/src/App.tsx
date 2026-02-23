import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {countries , languages , categories} from "./component/dropdown"
import React, { useEffect , useState } from "react";
import Title from "./component/title";
import FrontPageNews from "./component/frontPageNews";
import './App.css';

function App() {

  interface NewsArticle {
    title: string;
    image: string;
    author: string;
    description: string;
    source: string;
    url: string;
    publishedAt:string;
  }

  const [keyword , setKeyword] = useState("");
  const [frontPageData , setFrontPageData] = useState<NewsArticle[]>([]);
  const [specificData , setSpecificData] = useState<NewsArticle[]>([]);
  const [category , setCategory] = useState<string>("");
  const [country , setCountry] = useState<string>("");
  const [language , setLanguage] = useState<string>("");
  const [dropdown_country , setDropdown_country]= useState<string>("") ;
  const [dropdown_category , setDropdown_category]= useState<string>("") ;
  const [dropdown_language , setDropdown_language]= useState<string>("") ;

  const dataToRender = specificData.length>0 ? specificData : frontPageData;

  function handleChange(event:React.ChangeEvent<HTMLInputElement>){
    const value = event.target.value;
    setKeyword(value);
  }

  function handleSubmit(){informationFetch()}

  function handleKeydown(e:React.KeyboardEvent<HTMLInputElement>){
    if(e.key === "Enter"){informationFetch()}
  }

  async function informationFetch(){
    const result = await fetch("https://news-p9sh.onrender.com/news/fetch" ,{
      method:"POST",
      
      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({message:keyword , category:category , language:language , country:country} )
    });
    
    const specific_data = await result.json();
    setSpecificData(specific_data.data);
    console.log(specificData);
  }

  useEffect(() =>{
    async function loadFrontPage(){

      const front_Page_raw_data = await fetch("https://news-p9sh.onrender.com/front_page/headlines");
      const front_page_json_convertion = await front_Page_raw_data.json();
      const front_page_data = front_page_json_convertion.data;

      setFrontPageData(front_page_data);
    }
    loadFrontPage()
  },[]);

  return (
    <div>

      <Title />

      <div className="container my-4">
        <div className="row align-items-stretch justify-content-center">

          {/* Countries dropDown below*/}

          <div className="col-md-auto col-2 dropdown d-flex justify-content-end align-items-end">
            <button className="btn btn-secondary dropdown-toggle btn-dropdown text-capitalize" type="button" data-bs-toggle="dropdown">{keyword?"Country":dropdown_country?dropdown_country:"Country"}</button>
            <ul className="dropdown-menu dropdown-scroll">
              {countries.map((item)=>(
                <li key={item.code} className="dropdown-item" onClick={()=>{setCountry(item.code); setDropdown_country(item.name)}}>{item.name}</li>
              ))}
            </ul>
          </div>

          {/* Categories dropDown below */}

          <div className="col-md-auto col-2 ms-3 dropdown d-flex justify-content-center align-items-end">
            <button className="btn btn-secondary dropdown-toggle btn-dropdown text-capitalize" type="button" data-bs-toggle="dropdown">{keyword?"Category":dropdown_category?dropdown_category:"Category"}</button>
            <ul className="dropdown-menu dropdown-scroll ">
              {categories.map(item => (
                <li key={item.code} className="dropdown-item" onClick={()=>{ setCategory(item.code); setDropdown_category(item.name)}}>{item.name}</li>
              ))}
            </ul>
          </div>

          {/* Languages dropDown */}

          <div className="col-md-auto col-2 ms-3 dropdown d-flex justify-content-start align-items-end">
            <button className="btn btn-secondary dropdown-toggle btn-dropdown text-capitalize" type="button" data-bs-toggle="dropdown">{keyword?"Language":dropdown_language?dropdown_language:"Language"}</button>
            <ul className="dropdown-menu dropdown-scroll ">
              {languages.map(item => (
                <li key={item.code} className="dropdown-item" onClick={()=>{ setLanguage(item.code); setDropdown_language(item.name) }} >{item.name}</li>
              ))}
            </ul>
          </div>

          {/* User keyword input */}

          <div className="col-md col-8 mt-4">
            <input placeholder="Enter a Keyword" className="form-control" onChange={handleChange} onKeyDown={handleKeydown}></input>
          </div>

          <div className="col-md-2 col-4 mt-4">
            <button className="btn btn-primary for-btn h-100 w-100" onClick={handleSubmit} >Search</button>
          </div>
        </div>
      </div>


      {/* front page loading below*/}

      <div className="container-fluid ">
        <div className="row justify-content-center align-items-start">
          {dataToRender.map((items , index) => {
            return(
              <FrontPageNews key={index} title={items.title} img={items.image} author={items.author} description={items.description} url={items.url} source={items.source} publishedAt={items.publishedAt}/>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default App;
