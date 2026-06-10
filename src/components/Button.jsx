import React from "react";
// This component will be used to create a reusable button component that can be used in different parts of the application.
// It takes the following props:
// children: The content of the button.
// type: The type of the button. It can be 'button', 'submit' or 'reset'. The default value is 'button'.
export function Button({ 
    children,
    type= 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {

    return(
        <button className={`rounded-full px-5 py-3 font-bold shadow-[0_0_28px_rgba(139,92,246,0.32)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_42px_rgba(139,92,246,0.55)] ${className} ${bgColor} ${textColor}`} type={type} {...props}>
            {children}
        </button>
    )
}
export default Button;
