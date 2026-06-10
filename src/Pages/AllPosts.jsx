import React , {useEffect , useState} from "react";
import { useSelector } from 'react-redux';
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts(){
    const [posts , setPosts]= useState([])
    const userData = useSelector((state) => state.auth.userData);
    const currentUserId = userData?.$id;

    useEffect(()=>{
        appwriteService.getPosts([]).then((posts)=>{
            if(posts){ 
                const filteredPosts = posts.documents.filter(
                    (item) => item.status === 'active' || item.userId === currentUserId
                );
                setPosts(filteredPosts)
            }
        })
    },[currentUserId])
    return(
        <div className="w-full py-12">
            <Container>
                <div className="mb-10 text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-300">PIXORA Library</p>
                    <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">All Posts</h1>
                    <p className="mt-3 text-slate-400">Explore every picture, idea and story shared on the platform.</p>
                </div>
                <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {posts.map((post)=>(
                        <PostCard key={post.$id} {...post}/>      
                    ))}
                </div>
            </Container>

        </div>
    )
}
export default AllPosts;
