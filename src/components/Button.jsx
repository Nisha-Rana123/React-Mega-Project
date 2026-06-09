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
        <button className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`} type={type} {...props}>
            {children}
        </button>
    )
}
export default Button;