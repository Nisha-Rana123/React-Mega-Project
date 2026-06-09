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
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post)=>(
                        <div key={post.$id} className="p-2 w-1/4">
                           <PostCard {...post}/>      
                        </div>
                    ))}
                </div>
            </Container>

        </div>
    )
}
export default AllPosts;