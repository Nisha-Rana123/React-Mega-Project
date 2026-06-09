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
            {label && <label className="inline-block mb-1 pl-1" htmlFor={id}>{label}</label>}
            <input type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none 
            focus:bg-gray-50 duration-200 border border-gray-200 w-full
            ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
            
        </div>
    )
})

export default Input;