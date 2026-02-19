import "bootstrap/dist/css/bootstrap.min.css";
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

      body:JSON.stringify({message:keyword})
    });
    
    const specific_data = await result.json();
    console.log(specific_data);
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

  useEffect(()=>{
    console.log(frontPageData)
  },[frontPageData]);


  return (
    <div>

      <Title />

      <div className="container my-4">
        <div className="row ">
          <div className="col-lg-6 offset-lg-3 col-9 offset-1 ">
            <div className="row m-0 p-0 d-flex justify-content-center">

              <div className="col-md-8 col-9">
                <input placeholder="Enter a Keyword" className="form-control" onChange={handleChange} onKeyDown={handleKeydown}></input>
              </div>

              <div className="col-md-4 col-3">
                <button className="btn btn-primary for-btn" onClick={handleSubmit} >Search</button>
              </div>

            </div> 
          </div>
        </div>
      </div>


      {/* front page loading */}


      <div className="container-fluid ">
        <div className="row justify-content-center">
          {frontPageData.map((items , index) => {
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
