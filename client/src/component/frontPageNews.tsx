import type React from "react";

function FrontPageNews(props){
    return(
    <div className="col-xl-3 col-md-4 col-10 border rounded-4 my-4 mx-4">
        <img src={props.img} className="my-3"/>
        <h4 className="border my-2 p-2 rounded-3" >{props.title} ~ <span> {props.author}</span> </h4>
        <p className="p-2">{props.description}  <a href={props.url} className="p-0 m-0">Read More</a>  </p>
        
    </div>
    );
}

export default FrontPageNews;