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
      const [modal_Count , setModalCount] = useState(true);
    
    
      const dataToRender = specificData!==null ?specificData:frontPageData;
    
      function handleChange(event:React.ChangeEvent<HTMLInputElement>){
        const value = event.target.value;
        setKeyword(value);
      }
    
      function handleSubmit(){
        setModalCount(false);
        informationFetch()
      }
    
      function handleKeydown(e:React.KeyboardEvent<HTMLInputElement>){
        if(e.key === "Enter"){informationFetch()}
      }
    
      async function informationFetch(){
    
        try{
          setLoading(true);
    
          const result = await fetch("https://news-p9sh.onrender.com/custom/fetch" ,{
            method:"POST",
            
            headers:{
              "Content-Type":"application/json"
            },
      
            body:JSON.stringify({message:keyword} )
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

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header" style={{background:"#C0C0C0"}}>
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">How Your Personalized News Feed Works</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body" style={{background:"#E2E2E2"}}>
                    <p>Your news feed is customized based on your recent searches.When you search for a topic, we store the last four keywords you searched. These keywords are combined to request news from the News API, helping us show articles that better match your interests.Remember Only your latest four searches are used. # Try Entering 4 different genre's buzz</p>
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
              <div className="row">
                {/* User keyword input */}

                <div className="col-md col-8 mt-4">
                  <input placeholder="Enter a Keyword" className="form-control" onChange={handleChange} onKeyDown={handleKeydown}></input>
                </div>
    
                <div className="col-md-2 col-4 mt-4">
                  <button className="btn btn-primary for-btn h-100 w-100" onClick={handleSubmit} data-bs-toggle={modal_Count?"modal":""} data-bs-target={modal_Count?"#staticBackdrop":""}>Search</button>
                </div>
              </div>
            </div>
          
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