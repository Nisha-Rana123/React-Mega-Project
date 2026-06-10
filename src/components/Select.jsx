import React,{useId} from "react";
// This component will be used to create a reusable select component that can be used in different parts of the application.
function Select({options,
    label , 
    className='',
    ...props
},ref){
    const id = useId();
    return(

        <div className="w-full">
            {label && <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-200">{label}</label>}
            <select
            {...props}
            id={id}
            ref={ref}
            className={`w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none
                duration-200 focus:border-violet-300 focus:bg-slate-950 focus:shadow-[0_0_0_4px_rgba(139,92,246,0.18)]
                ${className}`}>
              {options?.map((option)=> (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
        </div>
    )
}
export default React.forwardRef(Select);
