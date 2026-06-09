import React , {useEffect , useState} from 'react'
import { useSelector } from 'react-redux';
import appwriteService from '../appwrite/config';
import { Container , PostCard } from '../components';

function Home(){
    const [post , setPosts]=useState([])
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
 if (post.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {post.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}
export default Home;