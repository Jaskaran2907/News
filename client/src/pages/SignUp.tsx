import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp(){

    const [email , setEmail] = useState<string>("");
    const [password , setPassword] = useState<string>("");
    const[sendOtp , SetSendOtp] = useState<number | null>(null);
    const[loadCustom , setLoadCustom] = useState<string | null>(null);
    const[userOtp , SetUserOtp] = useState<number>();
    const[otpStatus , setOtpStatus] = useState<string | null>(null);
    const [authStatus, setAuthStatus] = useState<string | null>(null);

    function handleEmail(event:React.ChangeEvent<HTMLInputElement>){
        setEmail(event.target.value);
    }

    function handlePassword(event:React.ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value);
    }


    function handleOtp(e:any){
        e.preventDefault();
        const otp = Math.floor((Math.random() * 9000)+1000)
        SetSendOtp(otp);
    }

    function handleUserOtp(event:React.ChangeEvent<HTMLInputElement>){
        let otp = event.target.value;
        SetUserOtp(parseInt(otp));
    }

    function handleOtpSubmit(){
        console.log(sendOtp , userOtp)
        if(sendOtp === userOtp){
            setLoadCustom("True")
        }else{
            setOtpStatus("fail")
        };
    }

    React.useEffect(()=>{
        sendAuthReq();
    },[sendOtp]);

    const sendAuthReq = async() => {
        try{
            const response = await fetch("http://localhost:8000/signUp" , {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({username:email , password:password ,otp:sendOtp})
            });

            const result = await response.json();
            result.status=="Successfully Authenticated"?setAuthStatus(result.status):null
        }catch(err){
            console.log("Error occured while sending SignUp request " , err);
        }
    }

    return(
        <>
            {!authStatus ? (
                    <div className="container mt-5 pt-3">
                        <div className="row justify-content-center">
                            <div className="col-xl-6 col-lg-8 col-md-10 col-11 border rounded-4 text-center px-4">
                            <h1 className="mt-2">Sign Up</h1>
                               <hr className="w-50 mx-auto"/>

                               <form onSubmit={handleOtp}>
                                    <input className="form-control mt-3 w-75 mx-auto" placeholder="Enter Your Email" type="email" onChange={handleEmail} value={email} required></input>
                                    <input className="form-control mt-2 w-75 mx-auto" placeholder="Set Your Password" type="password" onChange={handlePassword} value={password} minLength={8} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*]).{8,}$" title="Password must contain at least 8 characters, including uppercase, lowercase, number, and special character (@#$%^&*)" required></input>
                                    <p className="my-2">Click Enter to Send Otp via Email</p>
                                    <hr className="my-3"/>
                                    <button className="btn btn-primary w-100 my-4" type="submit" onClick={handleOtp}>Enter</button>
                                </form>
                            </div>
                        </div>
                    </div>
                ) : !loadCustom ? (
                    <div className="container mt-5 pt-3">
                        <div className="row justify-content-center">
                            <div className="col-xl-6 col-lg-8 col-md-10 col-11 border rounded-4 text-center px-4">
                                <h1 className="mt-2">Sign Up</h1>
                                <hr className="w-50 mx-auto"/>
                                <h4 className="mt-2 text-dark" >Enter Otp</h4>
                                <div className="d-flex align-items-center">
                                    <input className="form-control mt-3 my-1 w-75" placeholder="Enter Otp Sent via Email" onChange={handleUserOtp}></input>
                                    <button className="btn btn-primary mx-3" onClick={handleOtpSubmit}>Enter</button>
                                </div>
                                <div className="d-flex mx-2">
                                    {otpStatus && <p className="p-0 m-0 text-danger">Invalid Otp</p>}
                                </div>
                            </div>
                        </div> 
                    </div>
                ) :
                
                (
                    <div className="container mt-5 pt-3">
                        <div className="row justify-content-center">
                            <div className="col-xl-6 col-lg-8 col-md-10 col-11 border rounded-4 text-center px-4">
                                <h1 className="mt-2 text-success" >Sign Up Successfull</h1>
                                <hr className="w-50 mx-auto"/>

                                <Link className="btn btn-primary w-100 my-4" to="/customised">Load Customised Page</Link>
                            </div>
                        </div> 
                    </div>
                )
            } 
        </>

        
    );
};