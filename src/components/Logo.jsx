import React from 'react';
// This component will be used to display the logo of the application. It will be displayed in the header of the application.
// It will take a prop called width which will be used to set the width of the logo. The default value of the width is 100px.
export function Logo({ width = "100px" }) {
    return(
        <div className="flex flex-col items-center gap-2" style={{ width }}>
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 via-violet-500 to-blue-500 shadow-[0_0_35px_rgba(139,92,246,0.6)] ring-1 ring-white/20">
                <div className="grid h-8 w-8 place-items-center rounded-full border-4 border-slate-950/80 bg-white/10">
                    <div className="h-3 w-3 rounded-full bg-slate-950 shadow-[0_0_14px_rgba(255,255,255,0.7)]" />
                </div>
            </div>
            <span className="text-sm font-extrabold tracking-tight text-white">MegaBlog</span>
        </div>
    )
}
export default Logo;
