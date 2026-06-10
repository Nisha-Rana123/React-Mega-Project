import React from "react"; 
import {Container , Logo , LogoutBtn} from "../index";
import { useSelector } from "react-redux";
import {Link, NavLink} from "react-router-dom"

 function Header(){
const authStatus = useSelector((state)=> state.auth.status)
const navItems = [{
name: "Home",
slug: "/",
active: true
},
{
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  }]
    return(
  <header className="sticky top-0 z-50 border-b border-violet-500/10 bg-[#020617]/95 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
  <Container>
    <nav className="grid items-center gap-4 lg:grid-cols-[180px_1fr_460px]">
        <Link to="/" className="justify-self-center lg:justify-self-start">
            <Logo width="86px" />
        </Link>

        <Link to="/" className="text-center drop-shadow-[0_0_18px_rgba(255,255,255,0.22)]">
            <h1 className="pixora-display bg-gradient-to-r from-fuchsia-400 via-violet-400 to-blue-400 bg-clip-text text-4xl font-black text-transparent [text-shadow:0_0_22px_rgba(139,92,246,0.24)] sm:text-5xl">
                PIXORA
            </h1>
            <p className="-mt-2 text-sm font-black text-white sm:text-base">Picture + Blog Platform</p>
        </Link>

       <ul className="flex flex-wrap items-center justify-center gap-2 lg:justify-end">
        {navItems.map((item)=>
            item.active ?
            (<li key={item.name}>
                <NavLink
                    to={item.slug}
                    className={({isActive}) => `relative block px-3 py-2 text-sm font-black transition duration-300 hover:text-violet-200 ${isActive ? "text-violet-300" : "text-white"}`}
                >
                    {({isActive}) => (
                        <>
                            {item.name}
                            <span className={`absolute inset-x-3 -bottom-1 h-0.5 origin-left rounded-full bg-violet-400 transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0"}`} />
                        </>
                    )}
                </NavLink>
            </li>) : null
        )}
        {authStatus && (
            <li>
                <LogoutBtn />
            </li>
        )}
       </ul>
    </nav>
  </Container>
  
  </header>
    )
 }
export default Header;
