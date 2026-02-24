export default function Buffering(){
    return(
        <div className="d-flex justify-content-center align-items-center mt-4">
            <div className="spinner-grow " style={{width:"3rem", height:"3rem", color:"#E2E2E2"}}><span className="visually-hidden">Loading...</span></div>
        </div>
    );
}