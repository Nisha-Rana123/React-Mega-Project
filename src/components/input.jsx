import React from "react";
import {useId} from "react";
//forward ref is used to pass the ref from parent component to child component. *9
//it is used to create a reusable input component that can be used in different parts of the application.
//it takes two arguments, the first one is the props and the second one is the ref.
//it returns a JSX element that is the input field with the label and the ref.
//the label is optional and it is used to display the label of the input field.

const Input = React.forwardRef(function Input({label , type ='text' , className='', ...props }, ref ){
    const id= useId();
    return(
        <div className="w-full">
            {label && <label className="inline-block mb-2 pl-1 text-sm font-semibold text-slate-200" htmlFor={id}>{label}</label>}
            <input type={type}
            className={`w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none 
            duration-200 file:mr-4 file:rounded-full file:border-0 file:bg-violet-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white
            placeholder:text-slate-500 focus:border-violet-300 focus:bg-slate-950 focus:shadow-[0_0_0_4px_rgba(139,92,246,0.18)]
            ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
            
        </div>
    )
})

export default Input;
