import { useState } from "react";

export default function SignUp(){

    const [email , setEmail] = useState<string>("");
    const [password , setPassword] = useState<string>("");
    //const [Auth_staus , setAuthStatus] = useState<string | null>();

    function handleEmail(event:React.ChangeEvent<HTMLInputElement>){
        setEmail(event.target.value);
    }

    function handlePassword(event:React.ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value);
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        sendAuthReq();
    }

    const sendAuthReq = async() => {
        try{
            const response = await fetch("http://localhost:8000/signUp" , {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({username:email , password:password})
            });

            const result = await response.json();
            console.log(result.status);
        }catch(err){
            console.log("Error occured while sending SignUp request " , err);
        }
    }

    return(
        <div>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-8 col-md-10 col-11 border rounded-4 text-center px-4">
                        <h1 className="mt-2">Sign Up</h1>
                        <hr className="w-50 mx-auto"/>

                        <form onSubmit={handleSubmit}>
                            <input className="form-control mt-3 w-75 mx-auto" placeholder="Enter Your Email" type="email" onChange={handleEmail} value={email} required></input>
                            <input className="form-control mt-2 w-75 mx-auto" placeholder="Enter Your Password" type="password" onChange={handlePassword} value={password} required minLength={8}></input>

                            <button className="btn btn-primary my-2 w-100 my-3" type="submit">Enter</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};