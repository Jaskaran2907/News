import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp(){

    const [email , setEmail] = useState<string>("");
    const [password , setPassword] = useState<string>("");

    const [otpPhase , setOtpPhase] = useState<boolean>(false);
    const [userOtp , setUserOtp] = useState<string>("");

    const [otpStatus , setOtpStatus] = useState<string | null>(null);
    const [authStatus , setAuthStatus] = useState<string | null>(null);

    /* ---------------- EMAIL INPUT ---------------- */

    function handleEmail(event:React.ChangeEvent<HTMLInputElement>){
        setEmail(event.target.value);
    }

    /* ---------------- PASSWORD INPUT ---------------- */

    function handlePassword(event:React.ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value);
    }

    /* ---------------- REQUEST OTP ---------------- */

    async function handleOtp(e:any){

        e.preventDefault();

        try{

            const response = await fetch(
                "http://localhost:8000/request-otp",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        email:email,
                        password:password
                    })
                }
            );

            const result = await response.json();

            if(result.status === "OTP Sent"){
                setOtpPhase(true);
            }else{
                alert(result.status);
            }

        }catch(err){
            console.log("Error requesting OTP",err);
        }

    }

    /* ---------------- USER OTP INPUT ---------------- */

    function handleUserOtp(event:React.ChangeEvent<HTMLInputElement>){
        setUserOtp(event.target.value);
    }

    /* ---------------- VERIFY OTP ---------------- */

    async function handleOtpSubmit(){

        try{

            const response = await fetch(
                "http://localhost:8000/verify-otp",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        email:email,
                        otp:userOtp
                    })
                }
            );

            const result = await response.json();

            if(result.status === "Successfully Authenticated"){
                setAuthStatus(result.status);
            }else{
                setOtpStatus("fail");
            }

        }catch(err){
            console.log("Error verifying OTP",err);
        }

    }

    /* ---------------- RENDER ---------------- */

    return(
        <>
            {!authStatus ? (

                !otpPhase ? (

                    <div className="container mt-5 pt-3">
                        <div className="row justify-content-center">
                            <div className="col-xl-6 col-lg-8 col-md-10 col-11 border rounded-4 text-center px-4">

                                <h1 className="mt-2">Sign Up</h1>
                                <hr className="w-50 mx-auto"/>

                                <form onSubmit={handleOtp}>

                                    <input
                                        className="form-control mt-3 w-75 mx-auto"
                                        placeholder="Enter Your Email"
                                        type="email"
                                        onChange={handleEmail}
                                        value={email}
                                        required
                                    />

                                    <input
                                        className="form-control mt-2 w-75 mx-auto"
                                        placeholder="Set Your Password"
                                        type="password"
                                        onChange={handlePassword}
                                        value={password}
                                        minLength={8}
                                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*]).{8,}$"
                                        title="Password must contain at least 8 characters including uppercase, lowercase, number and special character"
                                        required
                                    />

                                    <p className="my-2">
                                        Click Enter to Send Otp via Email
                                    </p>

                                    <hr className="my-3"/>

                                    <button
                                        className="btn btn-primary w-100 my-4"
                                        type="submit"
                                    >
                                        Enter
                                    </button>

                                </form>

                            </div>
                        </div>
                    </div>

                ) : (

                    <div className="container mt-5 pt-3">
                        <div className="row justify-content-center">
                            <div className="col-xl-6 col-lg-8 col-md-10 col-11 border rounded-4 text-center px-4">

                                <h1 className="mt-2">Sign Up</h1>
                                <hr className="w-50 mx-auto"/>

                                <h4 className="mt-2 text-dark">
                                    Enter Otp
                                </h4>

                                <div className="d-flex align-items-center my-2">

                                    <input
                                        className="form-control mt-3 my-1 w-75"
                                        placeholder="Enter Otp Sent via Email"
                                        onChange={handleUserOtp}
                                    />

                                    <button
                                        className="btn btn-primary mx-3"
                                        onClick={handleOtpSubmit}
                                    >
                                        Enter
                                    </button>

                                </div>

                                <div className="d-flex mx-2 my-3">
                                    {otpStatus &&
                                        <p className="p-0 m-0 text-danger">
                                            Invalid Otp
                                        </p>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>

                )

            ) : (

                <div className="container mt-5 pt-3">
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-8 col-md-10 col-11 border rounded-4 text-center px-4">

                            <h1 className="mt-2 text-success">
                                Sign Up Successful
                            </h1>

                            <hr className="w-50 mx-auto"/>

                            <Link
                                className="btn btn-primary w-100 my-4"
                                to="/customised"
                            >
                                Load Customised Page
                            </Link>

                        </div>
                    </div>
                </div>

            )}
        </>
    );
}