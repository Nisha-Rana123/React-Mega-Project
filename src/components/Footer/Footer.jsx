import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

export function Footer() {
    const linkClass = "block text-sm text-slate-300 transition duration-300 hover:translate-x-1 hover:text-violet-300";

    return (
        <footer className="relative overflow-hidden border-t border-violet-500/10 bg-[#031027] py-12">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
                    <div>
                        <div className="mb-4 flex items-center gap-4">
                            <Logo width="70px" />
                            <div>
                                <h2 className="bg-gradient-to-r from-fuchsia-400 to-violet-400 bg-clip-text text-3xl font-black text-transparent">PIXORA</h2>
                                <p className="text-sm font-semibold text-slate-300">Picture + Blog Platform</p>
                            </div>
                        </div>
                        <p className="max-w-sm text-slate-400">
                            A platform where moments,<br />ideas and stories come alive.
                        </p>
                        <div className="mt-6 flex gap-3">
                            {["f", "X", "IG", "GH"].map((icon) => (
                                <Link key={icon} to="/" className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-xs font-bold text-white transition hover:-translate-y-1 hover:border-violet-300/60 hover:bg-violet-500/20 hover:shadow-[0_0_28px_rgba(139,92,246,0.45)]">
                                    {icon}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-violet-300">Company</h3>
                        <ul className="space-y-3">
                            {["About Us", "Features", "Pricing", "Press Kit"].map((item) => <li key={item}><Link className={linkClass} to="/">{item}</Link></li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-violet-300">Support</h3>
                        <ul className="space-y-3">
                            {["Help Center", "Contact Us", "FAQs", "Community"].map((item) => <li key={item}><Link className={linkClass} to="/">{item}</Link></li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-violet-300">Legal</h3>
                        <ul className="space-y-3">
                            {["Terms & Conditions", "Privacy Policy", "Licensing"].map((item) => <li key={item}><Link className={linkClass} to="/">{item}</Link></li>)}
                        </ul>
                    </div>
                </div>
                <div className="mt-10 border-t border-white/10 pt-5 text-center text-sm text-slate-400">
                    (c) 2026 PIXORA. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
