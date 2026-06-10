import React from "react";
import { Container , PostForm } from "../components";
function AddPost (){
 return(
    <div className="py-12">
        <Container>
            <div className="mb-8 text-center">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-300">Create on PIXORA</p>
                <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">Add Post</h1>
                <p className="mt-3 text-slate-400">Turn a picture and an idea into a premium story.</p>
            </div>
            <PostForm/>
        </Container>
    </div>
 )
}
export default AddPost;
