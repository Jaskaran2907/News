import {countries , languages , categories} from "../component/dropdown"
import React, { useEffect , useState } from "react";

import E404 from "../component/e404";


import Buffering from "../component/buffering";

import FrontPageNews from "../component/frontPageNews";


export default function Home(){

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
      const [loading , setLoading] = useState(false);
    
      const [frontPageData , setFrontPageData] = useState<NewsArticle[]>([]);
      const [specificData , setSpecificData] = useState<NewsArticle[] | null>(null);
    
      const [category , setCategory] = useState<string>("");
      const [country , setCountry] = useState<string>("");
      const [language , setLanguage] = useState<string>("");
    
      const [dropdown_country , setDropdown_country]= useState<string>("") ;
      const [dropdown_category , setDropdown_category]= useState<string>("") ;
      const [dropdown_language , setDropdown_language]= useState<string>("") ;
    
      const [modal_count , setModalCount] = useState(0);
    
      const dataToRender = specificData!==null ?specificData:frontPageData;
      const modal_count_handler = () => setModalCount(1);
    
      function handleChange(event:React.ChangeEvent<HTMLInputElement>){
        const value = event.target.value;
        setKeyword(value);
      }
    
      function handleSubmit(){informationFetch()}
    
      function handleKeydown(e:React.KeyboardEvent<HTMLInputElement>){
        if(e.key === "Enter"){informationFetch()}
      }
    
      async function informationFetch(){
    
        try{
          setLoading(true);
    
          const result = await fetch("https://news-p9sh.onrender.com/news/fetch" ,{
            method:"POST",
            
            headers:{
              "Content-Type":"application/json"
            },
      
            body:JSON.stringify({message:keyword , category:category , language:language , country:country} )
          });
          
          const specific_data = await result.json();
          setSpecificData(specific_data.data);
        }catch(err){
          console.log("Error occured while fetching the data ", err);
        }finally{
          setLoading(false);
        }
      }
    
      useEffect(() =>{
        async function loadFrontPage(){
    
          try{
            setLoading(true);
            const front_Page_raw_data = await fetch("https://news-p9sh.onrender.com/front_page/headlines");
            const front_page_json_convertion = await front_Page_raw_data.json();
            const front_page_data = front_page_json_convertion.data;
    
          setFrontPageData(front_page_data);
    
          }catch(err){
            console.log("Error occured while loading the front page ",)
          }finally{
            setLoading(false);
          }
        }
        loadFrontPage();
      },[]);
    
      return (
        <div>
    
          <>
    
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header" style={{background:"#C0C0C0"}}>
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Search Limitations</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body" style={{background:"#E2E2E2"}}>
                    <p>
                    Currently, due to limitations of the free API plan, news searches are only supported for the United States. The language must also be set to English; otherwise, results may not appear. You may choose any category when the country is set to the US.
                    </p>
                  </div>
                  <hr className="m-0" style={{background:"#E2E2E2"}}/>
                  <div className="modal-footer" style={{background:"#E2E2E2"}}>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Understood</button>
                  </div>
                </div>
              </div>
            </div>
    
            <div className="container my-4">
              <div className="row align-items-stretch justify-content-center">
    
                {/* Countries dropDown below*/}
    
                <div className="col-lg-auto col-4 dropdown d-flex justify-content-center align-items-end">
                  <button className="btn btn-secondary dropdown-toggle btn-dropdown text-capitalize" onClick={modal_count_handler} type="button" data-bs-toggle={modal_count?"dropdown":"modal"} data-bs-target="#staticBackdrop">{keyword?"Country":dropdown_country?dropdown_country:"Country"}</button>
                  <ul className="dropdown-menu dropdown-scroll">
                    {countries.map((item)=>(
                      <li key={item.code} className="dropdown-item" onClick={()=>{setCountry(item.code); setDropdown_country(item.name)}}>{item.name}</li>
                    ))}
                  </ul>
                </div>
    
                {/* Categories dropDown below */}
    
                <div className="col-lg-auto col-3 dropdown d-flex justify-content-center align-items-end">
                  <button className="btn btn-secondary btn-dropdown dropdown-toggle text-capitalize" type="button" data-bs-toggle="dropdown">{keyword?"Category":dropdown_category?dropdown_category:"Category"}</button>
                  <ul className="dropdown-menu dropdown-scroll ">
                    {categories.map(item => (
                      <li key={item.code} className="dropdown-item" onClick={()=>{ setCategory(item.code); setDropdown_category(item.name)}}>{item.name}</li>
                    ))}
                  </ul>
                </div>
    
                {/* Languages dropDown */}
    
                <div className="col-lg-auto col-5 dropdown d-flex justify-content-lg-start justify-content-center align-items-end">
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
    
          </>
          
          {/* front page loading below*/}
    
          {loading && <Buffering />}
          
          {!loading &&
            <div className="container-fluid">
              <div className="row justify-content-center align-items-start">
                {dataToRender.map((items , index) => {
                  return(
                    <FrontPageNews key={index} title={items.title} img={items.image} author={items.author} description={items.description} url={items.url} source={items.source} publishedAt={items.publishedAt}/>
                  )
                })}
              </div>
            </div>
          }
    
          {!loading && dataToRender.length == 0  && <E404 />}
        </div>
      )

}