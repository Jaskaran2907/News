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
                    <p className='text-dark ms-4 p-0 m-0'>{date}</p>
                </div>

                <div className='col-xl-6 col-md-4 d-flex justify-content-center'>
                    <h4 className='text-dark fs-1 '>The Public Brief</h4>
                </div>

                <div className='col-xl-3 col-md-4 d-flex justify-content-md-end justify-content-center gap-1 mt-1 mt-md-0'>
                    <button className='btn btn-primary auth-btn'>Login</button>
                    <button className='btn btn-secondary auth-btn'>Sign Up</button>
                </div>

            </div>
        </div>
    );
}

export default title;