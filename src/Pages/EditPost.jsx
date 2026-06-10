import React , {useEffect , useState} from "react"
import { Container, PostForm } from "../components"
import appwriteService from "../appwrite/config";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function  EditPost(){
    const [post , setPosts]= useState(null)
    const {slug}=useParams()
    const navigate = useNavigate()

    useEffect(()=>{
      if(slug){
        appwriteService.getPost(slug).then((post)=>{
            if(post){
                setPosts(post)
            }
        })
      }
      else{
        navigate('/')
    }
    },[slug , navigate])
    return post?(
  <div className="py-12">
    <Container>
        <div className="mb-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-300">Refine your story</p>
            <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">Edit Post</h1>
        </div>
        <PostForm post={post}/>
    </Container>
  </div>
    ) : null
}
export default EditPost;
