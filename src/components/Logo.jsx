import React from 'react';
import logoImage from '../assets/react.svg';
// This component will be used to display the logo of the application. It will be displayed in the header of the application.
// It will take a prop called width which will be used to set the width of the logo. The default value of the width is 100px.
export function Logo({ width = "100px" }) {
    return(
        <div className="flex flex-col items-center gap-1" style={{ maxWidth: width }}>
            <img src={logoImage} alt="App Logo" className="w-full h-auto" />
            <span className="text-sm font-bold text-white">MegaBlog</span>
        </div>
    )
}
export default Logo;