import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login(){

    const [email , setEmail] = useState<string>("");
    const [password , setPassword] = useState<string>("");
    const [authStatus, setAuthStatus] = useState<string | null>(null);
    
    function handleEmail(event:React.ChangeEvent<HTMLInputElement>){
        setEmail(event.target.value);
    }

    function handlePassword(event:React.ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value);
    }

    function handleSubmit(e:any){
        e.preventDefault();
        sendAuthReq()
    }

    const sendAuthReq = async() => {
        try{
            const response = await fetch("https://news-p9sh.onrender.com/login" , {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({username:email , password:password})
            });

            const result = await response.json();
            result.status=="Successfully Authenticated"?setAuthStatus(result.status):null;
        }catch(err){
            console.log("Error occured while sending login request " , err);
        }
    }

    return(
        <>
            {!authStatus ? (
                    <div className="container mt-5 pt-3">
                        <div className="row justify-content-center">
                            <div key="LoginPhase" className="col-xl-6 col-lg-8 col-md-10 col-11 border rounded-4 text-center px-5 py-4 signup-card shadow-lg bg-white">
                                <h1 className="mt-2 fw-bold text-primary">Login</h1>
                                <p className="text-muted small">Welcome back, please login to continue</p>
                                <hr className="w-50 mx-auto opacity-50"/>

                                <form onSubmit={handleSubmit}>
                                    <input className="form-control form-control-md mt-4 w-75 mx-auto" placeholder="Enter Your Email" type="email" onChange={handleEmail} value={email} required></input>
                                    <input className="form-control form-control-md mt-3 w-75 mx-auto" placeholder="Set Your Password" type="password" onChange={handlePassword} value={password} minLength={8} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*]).{8,}$" title="Password must contain at least 8 characters, including uppercase, lowercase, number, and special character (@#$%^&*)" required></input>
                                    
                                    <button className="btn btn-primary btn-lg w-100 my-4" type="submit">Enter</button>
                                </form>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="container mt-5 pt-3">
                        <div className="row justify-content-center">
                            <div key="success" className="col-xl-6 col-lg-8 col-md-10 col-11 border rounded-4 text-center px-5 py-4 signup-card shadow-lg bg-white">
                                <h1 className="mt-2 text-success fw-bold" >Login Successful</h1>
                                <p className="text-muted small">You are now logged in</p>
                                <hr className="w-50 mx-auto opacity-50"/>

                                <Link className="btn btn-primary btn-lg fw-semibold w-100 my-4" to="/customised">Load Customised Page</Link>
                            </div>
                        </div> 
                    </div>
                )
            } 
        </>
    );
};