import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
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
  }

  const [keyword , setKeyword] = useState("");
  const [frontPageData , setFrontPageData] = useState<NewsArticle[]>([]);
  const [specificData , setSpecificData] = useState<NewsArticle[]>([]);
  const [Category , setCategory] = useState<string>("");
  const [country , setCountry] = useState<string>("");
  const [language , setLanguage] = useState<string>("");

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

      body:JSON.stringify({message:keyword } )
    });
    
    const specific_data = await result.json();
    setSpecificData(specific_data.data);
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
        <div className="row align-items-stretch">

          <div className="col-md-auto col-4 dropdown d-flex justify-content-end align-items-end">
            <button className="btn btn-secondary dropdown-toggle btn-dropdown " type="button" data-bs-toggle="dropdown">Country</button>
            <ul className="dropdown-menu">
              <li className="dropdown-item" onClick={() => setCountry("ae")}>UAE</li>
              <li className="dropdown-item" onClick={() => setCountry("ar")}>Argentina</li>
              <li className="dropdown-item" onClick={() => setCountry("at")}>Austria</li>
              <li className="dropdown-item" onClick={() => setCountry("au")}>Australia</li>
              <li className="dropdown-item" onClick={() => setCountry("be")}>Belgium</li>
              <li className="dropdown-item" onClick={() => setCountry("bg")}>Bulgaria</li>
              <li className="dropdown-item" onClick={() => setCountry("br")}>Brazil</li>
              <li className="dropdown-item" onClick={() => setCountry("ca")}>Canada</li>
              <li className="dropdown-item" onClick={() => setCountry("ch")}>Switzerland</li>
              <li className="dropdown-item" onClick={() => setCountry("cn")}>China</li>
              <li className="dropdown-item" onClick={() => setCountry("co")}>Colombia</li>
              <li className="dropdown-item" onClick={() => setCountry("cu")}>Cuba</li>
              <li className="dropdown-item" onClick={() => setCountry("cz")}>Czech Republic</li>
              <li className="dropdown-item" onClick={() => setCountry("de")}>Germany</li>
              <li className="dropdown-item" onClick={() => setCountry("eg")}>Egypt</li>
              <li className="dropdown-item" onClick={() => setCountry("fr")}>France</li>
              <li className="dropdown-item" onClick={() => setCountry("gb")}>United Kingdom</li>
              <li className="dropdown-item" onClick={() => setCountry("gr")}>Greece</li>
              <li className="dropdown-item" onClick={() => setCountry("hk")}>Hong Kong</li>
              <li className="dropdown-item" onClick={() => setCountry("hu")}>Hungary</li>
              <li className="dropdown-item" onClick={() => setCountry("id")}>Indonesia</li>
              <li className="dropdown-item" onClick={() => setCountry("ie")}>Ireland</li>
              <li className="dropdown-item" onClick={() => setCountry("il")}>Israel</li>
              <li className="dropdown-item" onClick={() => setCountry("in")}>India</li>
              <li className="dropdown-item" onClick={() => setCountry("it")}>Italy</li>
              <li className="dropdown-item" onClick={() => setCountry("jp")}>Japan</li>
              <li className="dropdown-item" onClick={() => setCountry("kr")}>South Korea</li>
              <li className="dropdown-item" onClick={() => setCountry("lt")}>Lithuania</li>
              <li className="dropdown-item" onClick={() => setCountry("lv")}>Latvia</li>
              <li className="dropdown-item" onClick={() => setCountry("ma")}>Morocco</li>
              <li className="dropdown-item" onClick={() => setCountry("mx")}>Mexico</li>
              <li className="dropdown-item" onClick={() => setCountry("my")}>Malaysia</li>
              <li className="dropdown-item" onClick={() => setCountry("ng")}>Nigeria</li>
              <li className="dropdown-item" onClick={() => setCountry("nl")}>Netherlands</li>
              <li className="dropdown-item" onClick={() => setCountry("no")}>Norway</li>
              <li className="dropdown-item" onClick={() => setCountry("nz")}>New Zealand</li>
              <li className="dropdown-item" onClick={() => setCountry("ph")}>Philippines</li>
              <li className="dropdown-item" onClick={() => setCountry("pl")}>Poland</li>
              <li className="dropdown-item" onClick={() => setCountry("pt")}>Portugal</li>
              <li className="dropdown-item" onClick={() => setCountry("ro")}>Romania</li>
              <li className="dropdown-item" onClick={() => setCountry("rs")}>Serbia</li>
              <li className="dropdown-item" onClick={() => setCountry("ru")}>Russia</li>
              <li className="dropdown-item" onClick={() => setCountry("sa")}>Saudi Arabia</li>
              <li className="dropdown-item" onClick={() => setCountry("se")}>Sweden</li>
              <li className="dropdown-item" onClick={() => setCountry("sg")}>Singapore</li>
              <li className="dropdown-item" onClick={() => setCountry("si")}>Slovenia</li>
              <li className="dropdown-item" onClick={() => setCountry("sk")}>Slovakia</li>
              <li className="dropdown-item" onClick={() => setCountry("th")}>Thailand</li>
              <li className="dropdown-item" onClick={() => setCountry("tr")}>Turkey</li>
              <li className="dropdown-item" onClick={() => setCountry("tw")}>Taiwan</li>
              <li className="dropdown-item" onClick={() => setCountry("ua")}>Ukraine</li>
              <li className="dropdown-item" onClick={() => setCountry("us")}>United States</li>
              <li className="dropdown-item" onClick={() => setCountry("ve")}>Venezuela</li>
              <li className="dropdown-item" onClick={() => setCountry("za")}>South Africa</li>
            </ul>
          </div>

          <div className="col-md-auto col-4 dropdown d-flex justify-content-center align-items-end">
            <button className="btn btn-secondary dropdown-toggle btn-dropdown" type="button" data-bs-toggle="dropdown">Language</button>
            <ul className="dropdown-menu">
              <li className="dropdown-item" onClick={() => setLanguage("ar")}>Arabic</li>
              <li className="dropdown-item" onClick={() => setLanguage("de")}>German</li>
              <li className="dropdown-item" onClick={() => setLanguage("en")}>English</li>
              <li className="dropdown-item" onClick={() => setLanguage("es")}>Spanish</li>
              <li className="dropdown-item" onClick={() => setLanguage("fr")}>French</li>
              <li className="dropdown-item" onClick={() => setLanguage("he")}>Hebrew</li>
              <li className="dropdown-item" onClick={() => setLanguage("it")}>Italian</li>
              <li className="dropdown-item" onClick={() => setLanguage("nl")}>Dutch</li>
              <li className="dropdown-item" onClick={() => setLanguage("no")}>Norwegian</li>
              <li className="dropdown-item" onClick={() => setLanguage("pt")}>Portuguese</li>
              <li className="dropdown-item" onClick={() => setLanguage("ru")}>Russian</li>
              <li className="dropdown-item" onClick={() => setLanguage("sv")}>Swedish</li>
              <li className="dropdown-item" onClick={() => setLanguage("ud")}>Urdu</li>
              <li className="dropdown-item" onClick={() => setLanguage("zh")}>Chinese</li>
            </ul>
          </div>

          <div className="col-md-auto col-4 dropdown d-flex justify-content-start align-items-end">
            <button className="btn btn-secondary dropdown-toggle btn-dropdown" type="button" data-bs-toggle="dropdown">Category</button>
            <ul className="dropdown-menu">
              <li className="dropdown-item " onClick={ () => setCategory("business")}>Business</li>
              <li className="dropdown-item " onClick={ () => setCategory("technology")}>Technology</li>
              <li className="dropdown-item " onClick={ () => setCategory("entertainment")}>Entertainment</li>
              <li className="dropdown-item " onClick={ () => setCategory("general")}>General</li>
              <li className="dropdown-item " onClick={ () => setCategory("health")}>Health</li>
              <li className="dropdown-item " onClick={ () => setCategory("science")}>Science</li>
              <li className="dropdown-item " onClick={ () => setCategory("sports")}>Sports</li>
            </ul>
          </div>

          <div className="col-md col-8 mt-4">
            <input placeholder="Enter a Keyword" className="form-control" onChange={handleChange} onKeyDown={handleKeydown}></input>
          </div>

          <div className="col-md-2 col-4 mt-4">
            <button className="btn btn-primary for-btn h-100 w-100" onClick={handleSubmit} >Search</button>
          </div>
        </div>
      </div>


      {/* front page loading */}


      <div className="container-fluid ">
        <div className="row justify-content-center">
          {dataToRender.map((items , index) => {
            return(
              <FrontPageNews key={index} title={items.title} img={items.image} author={items.author} description={items.description} url={items.url}/>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default App;
