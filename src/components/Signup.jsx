import React, {useState} from "react";
import authService from "../appwrite/auth";
import { useNavigate , Link }  from "react-router-dom";
import {login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import {Button , Input , Logo} from "./index";
import { useForm } from "react-hook-form";

// This component will be used to display the signup form. It will contain the input fields for the name, email and password.
//  It will also contain a button to submit the form. If the user already has an account, it will contain a link to the login page.

function Signup(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const {register , handleSubmit} = useForm();
    const [error, setError] = useState("");
    const signup =async(data) =>{
        setError("");
        try{
          const userData=  await authService.createAccount(data);
            if(userData){
                 const userData = await authService.getCurrentUser()
               if(userData)   dispatch(login(userData))
                navigate("/");
            }
        } catch(error){
            setError(error.message);
        }
    }
    return(
        <div className="flex min-h-[70vh] w-full items-center justify-center bg-[#020817] px-4 py-12">
            <div className="mx-auto w-full max-w-md rounded-lg border border-violet-400/25 bg-[#050b22]/90 p-7 shadow-[0_0_55px_rgba(139,92,246,0.22)] backdrop-blur-xl">
                 <div className="flex justify-center mb-6">
                            <span className="inline-block">
                                <Logo width="100px" />
                            </span>
                       </div>
                    <h2 className="text-center text-3xl font-black leading-tight text-white">Create your account</h2>
                <p className="mt-3 text-center text-sm text-slate-400">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-bold text-violet-300 transition-all duration-200 hover:text-white hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="mt-5 rounded-lg border border-red-400/30 bg-red-500/10 p-3 text-center text-sm text-red-200">{error}</p>}
                <form onSubmit={handleSubmit(signup)} className="mt-6">
                    <div className="space-y-5">
                        <Input 
                        label= "Full Name:"
                        placeholder="Enter your full name"
                        {...register("name", {required: true})}
                        />
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
                              {...register("password", {required: true})}
                              />          
                                <Button type="submit" bgColor="bg-gradient-to-r from-fuchsia-500 to-violet-600" className="w-full rounded-lg">
                                    Create account</Button>

                        </div></form>
        </div>
        </div>
    )
}
export default Signup;
