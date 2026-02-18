import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Title from "./component/title";
import './App.css';

function App() {

  const [keyword , setKeyword] = useState("");

  function handleChange(event:React.ChangeEvent<HTMLInputElement>){
    const value = event.target.value;
    setKeyword(value);
  }

  function handleSubmit(){informationFetch()}

  function handleKeydown(e:React.KeyboardEvent<HTMLInputElement>){
    if(e.key === "Enter"){informationFetch()}
  }

  async function informationFetch(){
    const result = await fetch("http://localhost:8000/news/fetch" ,{
      method:"POST",
      
      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({message:keyword})
    });
    
    const data = await result.json();
    console.log(data);
  }

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

    </div>
  )
}

export default App;
