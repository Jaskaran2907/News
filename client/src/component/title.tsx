import { Link } from "react-router-dom";

function title(){

    const today = new Date();

    const date = today.toLocaleDateString("en-GB" , {
        day:"numeric",
        month:"short",
        year:"numeric"
    });


    return(
        <div className='container-fluid title-bar'>
            <div className='row align-items-center text-center p-4'>
            
                <div className='col-xl-3 col-md-4 d-flex justify-content-md-start justify-content-center'>
                    <p className='text-dark ms-4 p-0 m-0 fs-5' style={{fontFamily:"inherit"}}>{date}</p>
                </div>

                <div className='col-xl-6 col-md-4 d-flex justify-content-center'>
                    <Link to="/" className='text-dark fs-1 text-decoration-none'>The Public Brief</Link>
                </div>

                <div className='col-xl-3 col-md-4 d-flex justify-content-md-end justify-content-center gap-1 mt-1 mt-md-0'>
                    <Link to="/login" className="btn btn-primary auth-btn">Login</Link>
                    <Link to="/signup" className="btn btn-secondary auth-btn">Sign Up</Link>
                </div>

            </div>
        </div>
    );
}

export default title;