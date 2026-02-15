import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {

  const today = new Date();

  const date = today.toLocaleDateString("en-GB" , {
    day:"numeric",
    month:"short",
    year:"numeric"
  });

  return (
    <div className='container-fluid title-bar'>
      <div className='row align-items-center text-center p-4'>
        
        <div className='col-xl-3 col-lg-4 '>
          <p className='text-dark text-lg-start ms-4 p-0 m-0'>{date}</p>
        </div>

        <div className='col-xl-6 col-lg-4 '>
          <h4 className='text-dark fs-1 align-self-start'>The Public Brief</h4>
        </div>

        <div className='col-xl-3 col-lg-4 '>
          <button className='btn btn-primary auth-btn'>Login</button>
          <button className='btn btn-secondary ms-1 auth-btn '>Sign Up</button>
        </div>

      </div>
    </div>
  )
}

export default App;
