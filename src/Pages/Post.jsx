import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const currentUser = userData;

    const isAuthor = post && currentUser ? post.userId === currentUser.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    useEffect(() => {
        if (post && post.status === "inactive" && !isAuthor) {
            navigate("/");
        }
    }, [post, isAuthor, navigate]);

    useEffect(() => {
        let active = true;
        if (post?.featuredImage) {
            appwriteService.getFilePreview(post.featuredImage)
                .then((url) => {
                    if (active) setImagePreviewUrl(url || "");
                })
                .catch(() => {
                    if (active) setImagePreviewUrl("");
                });
        } else {
            setImagePreviewUrl("");
        }
        return () => {
            active = false;
        };
    }, [post]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                if (post.featuredImage) {
                    appwriteService.deleteFile(post.featuredImage);
                }
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-12">
            <Container>
                <div className="relative mx-auto mb-8 flex w-full max-w-5xl justify-center overflow-hidden rounded-[2rem] border border-violet-400/20 bg-[#1E293B]/60 p-3 shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
                    {imagePreviewUrl && (
                        <img
                            src={imagePreviewUrl}
                            alt={post.title}
                            className="max-h-[420px] w-auto max-w-full rounded-[1.5rem] object-contain"
                        />
                    )}

                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex gap-3">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-emerald-500">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="mb-8 w-full text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-300 [text-shadow:0_0_16px_rgba(139,92,246,0.5)]">PIXORA Story</p>
                    <h1 className="mx-auto mt-3 max-w-4xl text-4xl font-black leading-tight text-white [text-shadow:0_0_18px_rgba(255,255,255,0.16),0_0_34px_rgba(139,92,246,0.35)] sm:text-5xl">{post.title}</h1>
                </div>
                <div className="browser-css mx-auto max-w-4xl rounded-3xl border border-violet-400/20 bg-[#1E293B]/60 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-10">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
