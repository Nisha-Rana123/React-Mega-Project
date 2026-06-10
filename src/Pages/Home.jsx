import React , {useEffect , useState} from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import { Container , PostCard } from '../components';
import pixoraHero from '../assets/docs/pixora.jpeg';

function Home(){
    const [post , setPosts]=useState([])
    const userData = useSelector((state) => state.auth.userData);
    const currentUserId = userData?.$id;

    useEffect(()=>{
        appwriteService.getPosts([]).then((posts)=>{
            if(posts){ 
                const filteredPosts = posts.documents.filter(
                    (item) => item.status === 'active' || item.userId === currentUserId
                ).sort((a, b) => new Date(b.$createdAt || 0) - new Date(a.$createdAt || 0));
                setPosts(filteredPosts)
            }
        })    
    },[currentUserId])
    return (
        <div className="w-full bg-[#020817]">
            <section className="relative overflow-hidden border-b border-violet-500/10">
                <img
                    src={pixoraHero}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover object-center lg:object-[70%_center]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,23,0.96)_0%,rgba(2,8,23,0.7)_34%,rgba(2,8,23,0.08)_76%,rgba(2,8,23,0.32)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-[#020817]" />
                <Container>
                    <div className="relative z-10 flex min-h-[430px] items-center py-14 sm:py-20">
                        <div className="max-w-xl">
                            <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                                Share your world <br />
                                in <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">pictures & words.</span>
                            </h1>
                            <p className="mt-6 max-w-md text-lg font-medium leading-8 text-slate-300">
                                A place where moments, ideas and stories come alive.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link to="/all-posts" className="rounded-lg bg-gradient-to-r from-fuchsia-500 to-violet-600 px-7 py-4 text-sm font-black text-white shadow-[0_0_34px_rgba(139,92,246,0.42)] transition hover:-translate-y-0.5 hover:shadow-[0_0_48px_rgba(139,92,246,0.6)]">
                                    Explore Posts
                                </Link>
                                <Link to="/add-post" className="rounded-lg border border-violet-300/50 bg-slate-950/40 px-7 py-4 text-sm font-black text-white shadow-[inset_0_0_18px_rgba(139,92,246,0.1)] transition hover:-translate-y-0.5 hover:border-violet-200 hover:bg-violet-500/10">
                                    Create Post
                                </Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="py-10">
                <Container>
                    <div className="mb-5 flex items-center justify-between gap-4">
                        <h2 className="border-l-4 border-violet-500 pl-3 text-2xl font-black text-white">Latest Posts</h2>
                        <Link to="/all-posts" className="text-sm font-bold text-violet-300 transition hover:text-white">View all</Link>
                    </div>
                    {post.length === 0 ? (
                        <div className="rounded-lg border border-violet-400/20 bg-slate-950/70 p-8 text-center text-slate-300">
                            Login to read posts and start sharing your own stories.
                        </div>
                    ) : (
                        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                            {post.slice(0, 5).map((post) => (
                                <PostCard key={post.$id} {...post} />
                            ))}
                        </div>
                    )}
                </Container>
            </section>
        </div>
    )
}
export default Home;
