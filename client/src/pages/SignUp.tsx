import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp(){

    const [email , setEmail] = useState<string>("");
    const [password , setPassword] = useState<string>("");

    const [otpPhase , setOtpPhase] = useState<boolean>(false);
    const [userOtp , setUserOtp] = useState<string>("");

    const [otpStatus , setOtpStatus] = useState<string | null>(null);
    const [authStatus , setAuthStatus] = useState<string | null>(null);

    function handleEmail(event:React.ChangeEvent<HTMLInputElement>){
        setEmail(event.target.value);
    }

    function handlePassword(event:React.ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value);
    }


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


    function handleUserOtp(event:React.ChangeEvent<HTMLInputElement>){
        setUserOtp(event.target.value);
    }


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


    return(
        <>
            {!authStatus ? (

                !otpPhase ? (

                    <div className="container mt-5 pt-3">
                        <div className="row justify-content-center">
                            <div key="signup-card" className="col-xl-6 col-lg-8 col-md-10 col-11 border rounded-4 text-center px-5 py-4 signup-card shadow-lg bg-white">

                                <h1 className="mt-2 fw-semibold text-primary">
                                    Sign Up
                                </h1>
                                <p className="text-muted small">
                                    Create your account to continue
                                </p>

                                <hr className="w-50 mx-auto opacity-50"/>

                                <form onSubmit={handleOtp}>

                                    <input
                                        className="form-control mt-4 w-75 mx-auto  form-control-md"
                                        placeholder="Enter Your Email"
                                        type="email"
                                        onChange={handleEmail}
                                        value={email}
                                        required
                                    />

                                    <input
                                        className="form-control mt-3 w-75 mx-auto form-control-md"
                                        placeholder="Set Your Password"
                                        type="password"
                                        onChange={handlePassword}
                                        value={password}
                                        minLength={8}
                                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*]).{8,}$"
                                        title="Password must contain at least 8 characters including uppercase, lowercase, number and special character"
                                        required
                                    />

                                    <p className="my-3 text-muted small">
                                        Click Enter to receive OTP via email
                                    </p>

                                    <hr className="my-3 opacity-50"/>

                                    <button
                                        className="btn btn-primary w-100 my-3 btn-lg"
                                        type="submit"
                                    >
                                        Send OTP
                                    </button>

                                </form>

                            </div>
                        </div>
                    </div>

                ) : (

                    <div className="container mt-5 pt-3">
                        <div className="row justify-content-center">
                            <div key="otp-card" className="col-xl-6 col-lg-8 col-md-10 col-11 border rounded-4 text-center px-5 py-4 signup-card shadow-lg bg-white">

                                <h1 className="mt-2 fw-bold text-primary">
                                    Sign Up
                                </h1>
                                <hr className="w-50 mx-auto opacity-50"/>

                                <h4 className="mt-3 text-secondary fw-semibold">
                                    Enter OTP
                                </h4>

                                <p className="text-muted small">
                                    Check your email for the verification code
                                </p>

                                <div className="d-flex align-items-center justify-content-center my-3">

                                    <input
                                        className="form-control mt-2 my-1 w-75 form-control-md"
                                        placeholder="Enter OTP Sent via Email"
                                        onChange={handleUserOtp}
                                    />

                                    <button
                                        className="btn btn-primary mx-3 px-4 fw-semibold"
                                        onClick={handleOtpSubmit}
                                    >
                                        Verify
                                    </button>

                                </div>

                                <div className="d-flex justify-content-center mx-2 my-2">
                                    {otpStatus &&
                                        <p className="p-0 m-0 text-danger small fw-semibold">
                                            Invalid OTP
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
                        <div key="success" className="col-xl-6 col-lg-8 col-md-10 col-11 border rounded-4 text-center px-5 py-4 signup-card shadow-lg bg-white">

                            <h1 className="mt-2 text-success fw-bold">
                                Sign Up Successful
                            </h1>

                            <p className="text-muted small">
                                Your account has been created successfully
                            </p>

                            <hr className="w-50 mx-auto opacity-50"/>

                            <Link
                                className="btn btn-primary w-100 my-4 btn-lg fw-semibold"
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