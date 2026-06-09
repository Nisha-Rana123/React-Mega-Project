import React from "react";
// This component will be used to create a container for the application. It will be used to wrap the content of the
//  application and provide a consistent layout for the application. It will take a prop called children which will be used 
// to display the content of the application.
export function Container({ children }) {
  return (
    <div className="w-full max-w-7xl  mx-auto  px-4">
      {children}
    </div>);
}
export default Container;