import React from "react";
import { useNavigate , Link} from "react-router-dom";
import { useState } from "react";
import {login as authLogin} from "../store/authSlice";
import {Button , Input , Logo} from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

// This component will be used to display the login form . It will contain the input fields for the email and password.
//  It will also contain a button to submit the form . If the user does not have an account, it will contain a link to
//  the signup page.
function Login(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const {register , handleSubmit} = useForm();
    const [error, setError] = useState("");
    const login= async(data) =>{
        setError("");
        try{
            const session = await authService.login(data)
            if (session?.$id){
                const userData = await authService.getCurrentUser();
                if(userData){
                dispatch(authLogin( userData));
                navigate("/");
                }
            }
        }
        catch(error){
            setError(error?.message || "login failed");
        }
    }
    return(
<div className="w-full bg-gray-100 flex items-center justify-center">
    <div className={`mx-auto w-full max-w-md p-6 border border-gray-300 rounded-lg shadow-md bg-white`}>
        <div className="flex justify-center mb-6">
            <span className="inline-block w-full max-w-md">
                <Logo width="100%" />
            </span>
       </div>
       <h2 className="text-2xl font-bold text-center mb-6 leading-tight">Sign in to your account</h2>
         <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link 
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                     Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-6">
             <div className="space-y-5">
                <Input 
                label="Email:"
                type="email"
                placeholder="Enter your email"
                {...register("email", 
                    {required: true , 
                          validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                    })}/>
                    <Input 
                    label="Password:"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {required: true})}/>
                    <Button type="submit" className="w-full">Sign In</Button>
             </div>
        </form>
   </div>   
</div> 
) 
}
export default Login;