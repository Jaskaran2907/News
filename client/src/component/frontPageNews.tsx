interface FrontPageNewsProps {
    title: string;
    img: string;
    author: string;
    description: string;
    url: string;
    source:string;
    publishedAt:string;
}

function FrontPageNews(props:FrontPageNewsProps){
    return(
    <div className="articles_component col-xl-3 col-md-4 col-10 border rounded-5 my-4 mx-4 ">
        <div className="d-flex flex-column align-items-center">
            <h5 className="m-0 mt-2">Published On - <span className="fs-5" style={{fontFamily:"initial"}}>{props.publishedAt}</span></h5>
            <hr className="w-75 my-2"/>
        </div>
        <img src={props.img} className="my-3 img-fluid rounded-4"/>
            <h4 className="border my-2 p-2 rounded-3" >{props.title} ~ <span> {props.author}</span> </h4>
            <p className="p-2">{props.description}  <a href={props.url} className="p-0 m-0" rel="noopener noreferrer" >Read More</a>  </p>
    </div>
    );
}

export default FrontPageNews;